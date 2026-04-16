// ─────────────────────────────────────────────────────────────────────────────
// MyHealth API Service — connects React frontend to Node/Express backend
// ─────────────────────────────────────────────────────────────────────────────

// Ensure there is no trailing slash in the BASE_URL to prevent double slashes
const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

// Helper: attach JWT token to every request automatically
const authHeaders = () => {
  const token = localStorage.getItem("mh_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Helper: generic fetch wrapper with error handling
async function api(path, options = {}) {
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  const res = await fetch(`${BASE_URL}${normalizedPath}`, {
    ...options,
    headers: {
      ...authHeaders(),
      ...options.headers, // Allows overriding headers if needed
    },
  });

  // Handle empty responses (like 204 No Content)
  if (res.status === 204) return null;

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

// ── AUTH ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (body) => api("/api/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login:    (body) => api("/api/auth/login",    { method: "POST", body: JSON.stringify(body) }),
  profile:  ()     => api("/api/auth/profile"),
};

// ── DOCTORS ───────────────────────────────────────────────────────────────────
export const doctorAPI = {
  getAll:         (params = "") => api(`/api/doctors${params ? `?${params}` : ""}`),
  getOne:         (id)          => api(`/api/doctors/${id}`),
  search:         (query)       => api(`/api/doctors?search=${query}`),
  getBySpecialty: (spec)        => api(`/api/doctors?specialization=${spec}`),
};

// ── APPOINTMENTS ──────────────────────────────────────────────────────────────
export const appointmentAPI = {
  create:           (body) => api("/api/appointments",           { method: "POST", body: JSON.stringify(body) }),
  getMyAppointments: (email)=> api(`/api/appointments/patient/${email}`),
  getAvailableSlots: (doctorId, date) => api(`/api/appointments/available/${doctorId}/${date}`),
  cancel:           (id)   => api(`/api/appointments/${id}`,   { method: "PATCH", body: JSON.stringify({ status: "cancelled" }) }),
};

// ── AUTH HELPERS ──────────────────────────────────────────────────────────────
export const saveToken   = (token) => localStorage.setItem("mh_token", token);
export const getToken    = ()      => localStorage.getItem("mh_token");
export const removeToken = ()      => localStorage.removeItem("mh_token");
export const isLoggedIn  = ()      => !!localStorage.getItem("mh_token");