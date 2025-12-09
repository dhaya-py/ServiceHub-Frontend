// src/api/api.js
const BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
console.log("API Base URL:", BASE);


async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} - ${text}`);
  }
  return res.json().catch(() => null);
}

export const api = {
  getProviders: () => request("/providers"),
  getDashboardAdmin: () => request("/admin/summary"),
  getCustomers: (page=1, per_page=20) => request(`/admin/customers?page=${page}&per_page=${per_page}`),
  getCustomer: (id) => request(`/admin/customers/${id}`),
  getBookings: (q = {}) => request(`/bookings?${new URLSearchParams(q).toString()}`),
  getProviderSlots: (provider_id, service_id, date_str, interval_minutes=30) =>
    request(`/availability/provider/${provider_id}/slots?service_id=${service_id}&date_str=${date_str}&interval_minutes=${interval_minutes}`),
};
