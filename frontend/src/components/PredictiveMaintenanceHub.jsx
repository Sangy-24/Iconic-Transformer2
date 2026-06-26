import { useEffect, useRef, useState } from "react";
import MaterialIcon from "./MaterialIcon";
import { fetchSampleFleetAnalysis, uploadFleetAnalysis } from "../api/mlService";

const GAUGE_RADIUS = 88;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;

const TIMELINE_ICON_STYLES = {
  tertiary: {
    iconClass: "bg-tertiary-container",
    iconColor: "text-on-tertiary-container",
    badgeClass: "bg-primary-container/20 text-primary",
  },
  secondary: {
    iconClass: "bg-secondary-container",
    iconColor: "text-on-secondary-container",
    badgeClass: "bg-surface-container-high text-slate-500",
  },
  error: {
    iconClass: "bg-error-container",
    iconColor: "text-on-error-container",
    badgeClass: "bg-error-container/20 text-error",
  },
  primary: {
    iconClass: "bg-primary-container/30",
    iconColor: "text-primary",
    badgeClass: "bg-primary-container/20 text-primary",
  },
};

const STATUS_STYLES = {
  critical: "bg-error-container text-on-error-container",
  maintenance: "bg-tertiary-container text-on-tertiary-container",
  optimal: "bg-primary-container text-on-primary-container",
};

const PredictiveMaintenanceHub = () => {
  const [fleetData, setFleetData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [maintenanceFileName, setMaintenanceFileName] = useState("");
  const [scheduledUnits, setScheduledUnits] = useState({});
  const [dataSource, setDataSource] = useState("");

  const maintenanceFileInputRef = useRef(null);

  const applyAnalysis = (data, sourceLabel) => {
    setFleetData(data.fleet);
    setSummary(data.prediction);
    setDataSource(sourceLabel);
    setError("");
    setScheduledUnits({});
  };

  const loadSampleFleet = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchSampleFleetAnalysis();
      applyAnalysis(data, "Sample fleet (fleet_sample.csv)");
    } catch (err) {
      setError(err.message || "Could not load sample fleet. Start the ML service on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSampleFleet();
  }, []);

  const handleMaintenanceUpload = async (event) => {
    event.preventDefault();
    const file = maintenanceFileInputRef.current?.files?.[0];
    if (!file) {
      setError("Please select a telemetry CSV file first.");
      return;
    }

    setAnalyzing(true);
    setError("");
    setMaintenanceFileName(file.name);

    try {
      const data = await uploadFleetAnalysis(file);
      applyAnalysis(data, file.name);
    } catch (err) {
      setError(err.message || "Failed to analyze telemetry file.");
    } finally {
      setAnalyzing(false);
    }
  };

  const downloadMaintenanceTemplate = () => {
    const template = [
      "unit_id,location,vibration,temperature,oil_condition,load_levels,operating_hours",
      "IT-9000,Core Distribution,8.5,108,12,96,14200",
      "IT-9001,Substation North,1.1,45,88,62,3200",
      "IT-9002,Main Feed,4.2,72,55,78,8500",
    ].join("\n");
    const blob = new Blob([template], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "maintenance_telemetry_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const scheduleService = (unitId) => {
    setScheduledUnits((prev) => ({
      ...prev,
      [unitId]: new Date().toLocaleString(),
    }));
  };

  const fleetHealth = fleetData?.fleet_health_percent ?? 0;
  const gaugeOffset = GAUGE_CIRCUMFERENCE * (1 - fleetHealth / 100);
  const units = fleetData?.units ?? [];
  const timeline = fleetData?.timeline ?? [];

  return (
    <>
      {error && (
        <div className="rounded-lg border border-error-container/40 bg-error-container/10 px-5 py-4 text-sm text-error">
          <div className="flex items-start gap-3">
            <MaterialIcon name="error" className="mt-0.5" />
            <div>
              <p className="font-bold">{error}</p>
              <button type="button" onClick={loadSampleFleet} className="mt-2 font-semibold underline">
                Retry sample fleet load
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleMaintenanceUpload} className="glass-panel rounded-lg border border-white/40 p-6 shadow-industrial md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="mb-2 font-headline text-lg font-bold">Upload Telemetry Dataset</h3>
            <p className="text-sm text-secondary">
              CSV columns: vibration, temperature, oil_condition, load_levels, operating_hours. Optional: unit_id, location.
            </p>
            {dataSource && (
              <p className="mt-2 text-xs text-on-surface">
                Active dataset: <span className="font-semibold">{dataSource}</span>
              </p>
            )}
            {maintenanceFileName && (
              <p className="mt-1 text-xs text-secondary">
                Last upload: <span className="font-semibold">{maintenanceFileName}</span>
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <input ref={maintenanceFileInputRef} type="file" accept=".csv" className="hidden" />
            <button
              type="button"
              onClick={downloadMaintenanceTemplate}
              className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-5 py-3 text-sm font-bold transition-colors hover:bg-surface-container-low"
            >
              Download Template
            </button>
            <button
              type="button"
              onClick={() => maintenanceFileInputRef.current?.click()}
              className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-5 py-3 text-sm font-bold transition-colors hover:bg-surface-container-low"
            >
              Select File
            </button>
            <button
              type="button"
              onClick={loadSampleFleet}
              disabled={loading || analyzing}
              className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-5 py-3 text-sm font-bold transition-colors hover:bg-surface-container-low disabled:opacity-50"
            >
              Reload Sample
            </button>
            <button
              type="submit"
              disabled={analyzing}
              className="industrial-gradient rounded-lg px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-60"
            >
              {analyzing ? "Analyzing..." : "Run Fleet Diagnostic"}
            </button>
          </div>
        </div>

        {summary && (
          <div className="mt-6 rounded-lg border border-outline-variant/20 bg-surface-container-low p-5">
            <div className="flex items-start gap-3">
              <MaterialIcon name="insights" className="text-primary" />
              <div>
                <h4 className="font-bold text-on-surface">Fleet Diagnostic Summary</h4>
                <p className="text-sm text-secondary">{summary.details}</p>
                <p className="mt-1 text-sm text-secondary">
                  Aggregate risk: <span className="font-semibold text-on-surface">{summary.risk_level}</span>
                  {summary.time_window && (
                    <>
                      {" "}
                      · Next action window: <span className="font-semibold text-on-surface">{summary.time_window}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </form>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-surface-container-lowest p-8 text-center shadow-industrial lg:col-span-4">
          <h3 className="text-xs font-headline font-bold uppercase tracking-widest text-secondary">Overall Fleet Health</h3>
          {loading ? (
            <div className="flex h-48 items-center justify-center text-sm text-secondary">Loading fleet analysis...</div>
          ) : (
            <>
              <div className="relative h-48 w-48">
                <svg className="h-full w-full -rotate-90 transform">
                  <circle
                    cx="96"
                    cy="96"
                    r={GAUGE_RADIUS}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-surface-container-low"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r={GAUGE_RADIUS}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={GAUGE_CIRCUMFERENCE}
                    strokeDashoffset={gaugeOffset}
                    className="text-primary-container transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-headline text-5xl font-extrabold text-primary">{fleetHealth}%</span>
                  <span className="text-xs font-medium text-secondary">{fleetData?.fleet_status_label || "—"}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-on-surface-variant">
                {fleetData?.total_units ?? 0} units monitored.
                {fleetData?.attention_count ? ` ${fleetData.attention_count} require attention.` : " All units nominal."}
              </p>
            </>
          )}
        </div>

        <div className="overflow-hidden rounded-lg bg-surface-container-lowest p-8 shadow-industrial lg:col-span-8">
          <h3 className="mb-8 text-xs font-headline font-bold uppercase tracking-widest text-secondary">Predicted Service Timeline</h3>
          {loading ? (
            <p className="text-sm text-secondary">Building maintenance schedule...</p>
          ) : timeline.length === 0 ? (
            <div className="rounded-lg bg-surface-container-low p-6 text-center">
              <MaterialIcon name="check_circle" className="mb-2 text-4xl text-primary" />
              <p className="font-semibold text-on-surface">No maintenance events predicted</p>
              <p className="text-sm text-secondary">All monitored units are currently in optimal condition.</p>
            </div>
          ) : (
            <div className="relative space-y-6">
              <div className="absolute bottom-0 left-[23px] top-0 w-0.5 bg-surface-container-low" />
              {timeline.map((item) => {
                const styles = TIMELINE_ICON_STYLES[item.icon_tone] || TIMELINE_ICON_STYLES.primary;
                return (
                  <div key={`${item.unit_id}-${item.title}`} className="relative flex items-center gap-6">
                    <div className={`z-10 flex h-12 w-12 items-center justify-center rounded-full ${styles.iconClass}`}>
                      <MaterialIcon name={item.icon} className={styles.iconColor} />
                    </div>
                    <div className={`glass-panel flex-1 rounded-lg border border-white/40 p-4 ${item.urgent ? "bg-error-container/5" : ""}`}>
                      <div className="flex justify-between gap-4">
                        <h4 className={`font-bold ${item.urgent ? "text-error" : "text-slate-800"}`}>{item.title}</h4>
                        <span className={`rounded px-2 py-1 text-xs font-bold ${styles.badgeClass}`}>{item.date_label}</span>
                      </div>
                      <p className={`mt-1 text-sm ${item.urgent ? "text-on-error-container" : "text-secondary"}`}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-headline font-bold uppercase tracking-widest text-secondary">Live Asset Monitoring</h3>
          <span className="flex items-center gap-2 text-xs font-bold text-primary">
            <span className={`h-2 w-2 rounded-full bg-primary ${loading || analyzing ? "animate-pulse" : ""}`} />
            {loading || analyzing ? "SYNCING DATA" : "LIVE DATA STREAM"}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((slot) => (
              <div key={slot} className="h-64 animate-pulse rounded-lg bg-surface-container-low" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {units.map((asset) => {
              const isScheduled = Boolean(scheduledUnits[asset.id]);
              return (
                <div key={asset.id} className="rounded-lg bg-surface-container-lowest p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">Unit {asset.id}</h4>
                      <p className="text-xs text-slate-500">{asset.location}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_STYLES[asset.status_tone]}`}>
                      {asset.status}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Temperature</span>
                      <span className="font-semibold">{asset.temperature}°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Vibration</span>
                      <span className="font-semibold">{asset.vibration} mm/s</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Oil Quality</span>
                      <span className="font-semibold">{asset.oil_condition}%</span>
                    </div>
                    <div className="border-t border-surface-container pt-4">
                      <p className="mb-2 text-[10px] font-bold uppercase text-slate-400">Failure Probability</p>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-low">
                        <div
                          className={`h-full transition-all duration-500 ${asset.status_tone === "critical" ? "bg-error" : "bg-primary"}`}
                          style={{ width: `${Math.min(asset.failure_probability, 100)}%` }}
                        />
                      </div>
                      <span className={`mt-1 inline-block text-xs font-bold ${asset.status_tone === "critical" ? "text-error" : "text-primary"}`}>
                        {asset.failure_probability}%
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => asset.needs_service && !isScheduled && scheduleService(asset.id)}
                    disabled={!asset.needs_service || isScheduled}
                    className={`mt-6 w-full rounded-lg py-2 text-xs font-bold transition-all ${
                      isScheduled
                        ? "bg-primary/10 text-primary"
                        : asset.needs_service
                          ? "bg-surface-container-high hover:bg-primary hover:text-white"
                          : "cursor-not-allowed bg-surface-container-low text-on-surface-variant"
                    }`}
                  >
                    {isScheduled ? "Service Scheduled" : asset.needs_service ? "Schedule Service" : "Monitoring"}
                  </button>
                  {isScheduled && (
                    <p className="mt-2 text-center text-[10px] text-secondary">Booked {scheduledUnits[asset.id]}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default PredictiveMaintenanceHub;
