const ML_API_BASE = import.meta.env.VITE_ML_API_URL || "http://localhost:8000";

async function parseJsonResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    const detail = data?.detail;
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail || data));
  }
  return data;
}

export async function fetchSampleFleetAnalysis() {
  const response = await fetch(`${ML_API_BASE}/predict-maintenance/sample`);
  return parseJsonResponse(response);
}

export async function uploadFleetAnalysis(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${ML_API_BASE}/predict-maintenance`, {
    method: "POST",
    body: formData,
  });
  return parseJsonResponse(response);
}

export { ML_API_BASE };
