import os
from datetime import datetime, timedelta

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

FEATURES = ["vibration", "temperature", "oil_condition", "load_levels", "operating_hours"]
MODEL_PATH = os.path.join(os.path.dirname(__file__), "predictive_maintenance_rf.pkl")
STATUS_MAP = {0: "Healthy", 1: "Maintenance Required", 2: "Critical Failure Risk"}
UNIT_ID_ALIASES = ["unit_id", "asset_id", "transformer_id", "id"]
LOCATION_ALIASES = ["location", "site", "zone", "area"]

HEALTH_SCORES = {
    "Healthy": 100,
    "Maintenance Required": 62,
    "Critical Failure Risk": 28,
    "Unknown": 50,
}

FLEET_STATUS_LABELS = [
    (85, "OPTIMIZED"),
    (70, "STABLE"),
    (50, "ATTENTION NEEDED"),
    (0, "CRITICAL"),
]

DEFAULT_LOCATIONS = [
    "Core Distribution",
    "Substation North",
    "Main Feed",
    "Auxiliary Gen",
    "Grid East",
    "Grid West",
    "Backup Line",
    "Primary Bus",
]


def generate_mock_data():
    """Fallback training data (keeps service working if CSVs are missing)."""
    data = {
        "vibration": [0.1, 0.4, 0.9, 0.2, 0.8, 1.2, 0.1, 0.3],
        "temperature": [45, 60, 95, 50, 85, 110, 48, 55],
        "oil_condition": [90, 75, 40, 88, 50, 30, 92, 80],
        "load_levels": [60, 75, 95, 65, 85, 98, 62, 70],
        "operating_hours": [1000, 3000, 8000, 1500, 6000, 9500, 1200, 2500],
        "health_status": [0, 0, 2, 0, 1, 2, 0, 0],
    }
    return pd.DataFrame(data)


def load_training_data():
    base_dir = os.path.dirname(os.path.dirname(__file__))
    low_risk = pd.read_csv(os.path.join(base_dir, "low_risk_industrial_data.csv"))
    low_risk["health_status"] = 0

    medium_risk = pd.read_csv(os.path.join(base_dir, "medium_risk_industrial_data.csv"))
    medium_risk["health_status"] = 1

    high_risk = pd.read_csv(os.path.join(base_dir, "high_risk_industrial_data.csv"))
    high_risk["health_status"] = 2

    return pd.concat([low_risk, medium_risk, high_risk], ignore_index=True)


def train_model():
    try:
        df = load_training_data()
    except Exception as e:
        print(f"Training data not available, using mock data instead. Error: {str(e)}")
        df = generate_mock_data()

    X = df[FEATURES]
    y = df["health_status"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    joblib.dump(model, MODEL_PATH)
    print("Model trained and saved.")


def load_model():
    try:
        return joblib.load(MODEL_PATH)
    except Exception:
        print("No model found. Training a new one...")
        train_model()
        return joblib.load(MODEL_PATH)


def _resolve_column(columns, aliases):
    normalized = {str(col).strip().lower(): col for col in columns}
    for alias in aliases:
        if alias in normalized:
            return normalized[alias]
    return None


def _predict_with_model(df):
    model = load_model()
    working_df = df.copy()

    for col in FEATURES:
        if col not in working_df.columns:
            working_df[col] = 0

    try:
        predictions = model.predict(working_df[FEATURES])
        probabilities = model.predict_proba(working_df[FEATURES])
    except Exception as e:
        if isinstance(e, AttributeError) or "monotonic_cst" in str(e):
            print(f"Model prediction failed due to incompatibility: {str(e)}. Retraining...")
            train_model()
            model = load_model()
            predictions = model.predict(working_df[FEATURES])
            probabilities = model.predict_proba(working_df[FEATURES])
        else:
            raise

    class_index = {int(label): idx for idx, label in enumerate(model.classes_)}
    return working_df, predictions, probabilities, class_index


def predict_health(df):
    _, predictions, _, _ = _predict_with_model(df)
    return [STATUS_MAP.get(int(pred), "Unknown") for pred in predictions]


def _failure_probability(proba_row, class_index):
    p_maint = float(proba_row[class_index.get(1, 0)]) if 1 in class_index else 0.0
    p_crit = float(proba_row[class_index.get(2, 0)]) if 2 in class_index else 0.0
    return round(p_crit * 100 + p_maint * 45, 1)


def _fleet_status_label(health_percent):
    for threshold, label in FLEET_STATUS_LABELS:
        if health_percent >= threshold:
            return label
    return "CRITICAL"


def _ui_status(health_label):
    if health_label == "Critical Failure Risk":
        return "AT RISK", "critical"
    if health_label == "Maintenance Required":
        return "MAINTENANCE", "maintenance"
    return "OPTIMAL", "optimal"


def _recommend_service(row, health_label):
    vibration = float(row["vibration"])
    temperature = float(row["temperature"])
    oil_condition = float(row["oil_condition"])

    if health_label == "Critical Failure Risk":
        if oil_condition < 40:
            return {
                "icon": "oil_barrel",
                "icon_tone": "tertiary",
                "title_suffix": "Critical Oil Service",
                "description": "Oil quality is critically degraded. Immediate replacement required to prevent insulation failure.",
                "days_until": 0,
                "urgent": True,
            }
        if vibration >= 5:
            return {
                "icon": "warning",
                "icon_tone": "error",
                "title_suffix": "Critical Vibration Service",
                "description": f"Immediate vibration analysis required. Peak reading {vibration:.1f} mm/s exceeds safe operating limits.",
                "days_until": 0,
                "urgent": True,
            }
        return {
            "icon": "warning",
            "icon_tone": "error",
            "title_suffix": "Critical Service",
            "description": "Multiple telemetry indicators exceed critical thresholds. Schedule emergency inspection immediately.",
            "days_until": 0,
            "urgent": True,
        }

    if oil_condition < 55:
        return {
            "icon": "oil_barrel",
            "icon_tone": "tertiary",
            "title_suffix": "Oil Replacement",
            "description": f"AI predicts viscosity degradation below threshold in {max(7, int(20 - oil_condition / 5))} days.",
            "days_until": max(7, int(20 - oil_condition / 5)),
            "urgent": False,
        }
    if temperature >= 75:
        return {
            "icon": "thermostat",
            "icon_tone": "secondary",
            "title_suffix": "Thermal Sensor Calibration",
            "description": "Elevated thermal load detected. Scheduled calibration recommended for precision alignment.",
            "days_until": 14,
            "urgent": False,
        }
    if vibration >= 3:
        return {
            "icon": "engineering",
            "icon_tone": "primary",
            "title_suffix": "Winding Inspection",
            "description": "Harmonic resonance drift detected. Preventive inspection advised before peak load season.",
            "days_until": 21,
            "urgent": False,
        }
    return {
        "icon": "handyman",
        "icon_tone": "primary",
        "title_suffix": "Routine Maintenance",
        "description": "Scheduled routine maintenance based on operating hours and load profile.",
        "days_until": 30,
        "urgent": False,
    }


def _format_timeline_date(days_until, urgent):
    if urgent or days_until <= 0:
        return "URGENT"
    target = datetime.now() + timedelta(days=int(days_until))
    return target.strftime("%b %d, %Y").upper()


def _prepare_unit_frame(df):
    unit_col = _resolve_column(df.columns, UNIT_ID_ALIASES)
    location_col = _resolve_column(df.columns, LOCATION_ALIASES)

    if unit_col:
        grouped = df.groupby(unit_col, as_index=False)[FEATURES].mean()
        if str(unit_col).lower() == "unit_id":
            grouped["unit_id"] = grouped[unit_col].astype(str)
        else:
            grouped["unit_id"] = grouped[unit_col].astype(str)
            grouped = grouped.drop(columns=[unit_col])

        if location_col:
            locations = df.groupby(unit_col)[location_col].first().astype(str)
            grouped["location"] = grouped["unit_id"].map(locations)
        else:
            grouped["location"] = [DEFAULT_LOCATIONS[i % len(DEFAULT_LOCATIONS)] for i in range(len(grouped))]
        return grouped

    if len(df) <= 12:
        working = df[FEATURES].copy().reset_index(drop=True)
        working["unit_id"] = [f"IT-{9000 + i}" for i in range(len(working))]
        working["location"] = [DEFAULT_LOCATIONS[i % len(DEFAULT_LOCATIONS)] for i in range(len(working))]
        return working

    # Large files without unit IDs: aggregate by row windows to avoid hundreds of cards.
    chunk_size = max(1, len(df) // 8)
    chunks = []
    for start in range(0, len(df), chunk_size):
        chunk = df.iloc[start : start + chunk_size]
        unit_index = len(chunks)
        chunks.append(
            {
                **chunk[FEATURES].mean().to_dict(),
                "unit_id": f"IT-{9000 + unit_index}",
                "location": DEFAULT_LOCATIONS[unit_index % len(DEFAULT_LOCATIONS)],
            }
        )
    return pd.DataFrame(chunks)


def analyze_fleet(df):
    unit_df = _prepare_unit_frame(df)
    _, predictions, probabilities, class_index = _predict_with_model(unit_df)

    units = []
    timeline = []

    for idx, row in unit_df.iterrows():
        health_label = STATUS_MAP.get(int(predictions[idx]), "Unknown")
        ui_status, ui_tone = _ui_status(health_label)
        failure_probability = _failure_probability(probabilities[idx], class_index)
        service = _recommend_service(row, health_label)

        unit = {
            "id": str(row["unit_id"]),
            "location": str(row["location"]),
            "status": ui_status,
            "status_tone": ui_tone,
            "health_label": health_label,
            "temperature": round(float(row["temperature"]), 1),
            "vibration": round(float(row["vibration"]), 1),
            "oil_condition": round(float(row["oil_condition"]), 1),
            "load_levels": round(float(row["load_levels"]), 1),
            "operating_hours": int(round(float(row["operating_hours"]))),
            "failure_probability": failure_probability,
            "needs_service": health_label != "Healthy",
        }
        units.append(unit)

        if health_label != "Healthy":
            timeline.append(
                {
                    "unit_id": unit["id"],
                    "icon": service["icon"],
                    "icon_tone": service["icon_tone"],
                    "title": f"Unit {unit['id']} {service['title_suffix']}",
                    "description": service["description"],
                    "date_label": _format_timeline_date(service["days_until"], service["urgent"]),
                    "days_until": service["days_until"],
                    "urgent": service["urgent"],
                    "health_label": health_label,
                    "sort_key": (0 if service["urgent"] else 1, service["days_until"]),
                }
            )

    units.sort(key=lambda item: item["failure_probability"], reverse=True)
    timeline.sort(key=lambda item: item["sort_key"])

    all_health_labels = [STATUS_MAP.get(int(pred), "Unknown") for pred in predictions]
    health_percent = round(
        sum(HEALTH_SCORES.get(label, 50) for label in all_health_labels) / max(len(all_health_labels), 1),
        1,
    )
    attention_count = sum(1 for label in all_health_labels if label != "Healthy")
    critical_count = sum(1 for label in all_health_labels if label == "Critical Failure Risk")

    return {
        "fleet_health_percent": health_percent,
        "fleet_status_label": _fleet_status_label(health_percent),
        "total_units": len(units),
        "attention_count": attention_count,
        "critical_count": critical_count,
        "units": units,
        "timeline": [{key: value for key, value in item.items() if key != "sort_key"} for item in timeline[:8]],
        "records_analyzed": len(df),
    }


def load_sample_fleet_df():
    sample_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "fleet_sample.csv")
    return pd.read_csv(sample_path)


if __name__ == "__main__":
    train_model()
