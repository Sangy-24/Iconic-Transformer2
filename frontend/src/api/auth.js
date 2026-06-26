const AUTH_API_BASE = import.meta.env.VITE_AUTH_API_URL || "http://localhost:5000/api/auth";

async function parseJsonResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    const message = data?.message || data?.detail;
    throw new Error(typeof message === "string" ? message : JSON.stringify(message || data));
  }
  return data;
}

export async function signupUser({ name, email, password, role }) {
  const response = await fetch(`${AUTH_API_BASE}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, role }),
  });
  return parseJsonResponse(response);
}

export async function loginUser({ email, password, loginType }) {
  const response = await fetch(`${AUTH_API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, loginType }),
  });
  return parseJsonResponse(response);
}
