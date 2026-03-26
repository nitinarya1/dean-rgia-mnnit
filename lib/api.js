const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("rgia_admin_token");
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function apiPost(endpoint, data, requireAuth = false) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(requireAuth ? authHeaders() : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `API error: ${res.status}`);
  }
  return res.json();
}

export async function apiPut(endpoint, data) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `API error: ${res.status}`);
  }
  return res.json();
}

export async function apiDelete(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `API error: ${res.status}`);
  }
  return res.json();
}

// Auth helpers
export async function login(username, password) {
  const data = await apiPost("/auth/login", { username, password });
  localStorage.setItem("rgia_admin_token", data.token);
  localStorage.setItem("rgia_admin_user", data.username);
  return data;
}

export function logout() {
  localStorage.removeItem("rgia_admin_token");
  localStorage.removeItem("rgia_admin_user");
}

export function isLoggedIn() {
  return !!getToken();
}

export async function verifyToken() {
  try {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      headers: authHeaders(),
    });
    return res.ok;
  } catch {
    return false;
  }
}
