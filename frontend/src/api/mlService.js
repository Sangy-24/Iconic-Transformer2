const ML_API_BASE = import.meta.env.VITE_ML_API_URL || "http://127.0.0.1:8000";

async function parseJsonResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    const detail = data?.detail;
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail || data));
  }
  return data;
}

export async function fetchSampleFleetAnalysis() {
  try {
    const response = await fetch(`${ML_API_BASE}/predict-maintenance/sample`);
    return parseJsonResponse(response);
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error;
    }
    throw new Error(
      `Could not reach the ML service at ${ML_API_BASE}. Start it with "python app.py" from the ml_services folder.`
    );
  }
}

export async function uploadFleetAnalysis(file) {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await fetch(`${ML_API_BASE}/predict-maintenance`, {
      method: "POST",
      body: formData,
    });
    return parseJsonResponse(response);
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error;
    }
    throw new Error(
      `Could not reach the ML service at ${ML_API_BASE}. Start it with "python app.py" from the ml_services folder.`
    );
  }
}

export { ML_API_BASE };
