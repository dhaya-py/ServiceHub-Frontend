// src/api/bookings.js
import { formatISO } from "date-fns";

const BASE = "http://127.0.0.1:8000"; // change to your backend base if needed

async function fetchJson(url, opts = {}) {
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} - ${text}`);
  }
  return res.json();
}

/**
 * GET provider/admin bookings with optional filters
 * Query params: start, end, status, provider_id, search, page, per_page
 */
export async function getBookings({ start, end, status, provider_id, search, page = 1, per_page = 50 }) {
  // Sample: /api/bookings?start=2025-12-01&end=2025-12-31
  const q = new URLSearchParams();
  if (start) q.set("start", start instanceof Date ? formatISO(start, { representation: "date" }) : start);
  if (end) q.set("end", end instanceof Date ? formatISO(end, { representation: "date" }) : end);
  if (status) q.set("status", status);
  if (provider_id) q.set("provider_id", provider_id);
  if (search) q.set("q", search);
  q.set("page", page);
  q.set("per_page", per_page);
  return fetchJson(`${BASE}/bookings?${q.toString()}`);
}

/**
 * GET single booking
 */
export async function getBookingById(id) {
  return fetchJson(`${BASE}/bookings/${id}`);
}

/**
 * Provider actions (accept/reject/complete/cancel)
 */
export async function updateBookingStatus(id, action) {
  // action = "accept"|"reject"|"complete" etc. Adapt to your backend routes.
  // Example: POST /api/bookings/123/accept
  return fetchJson(`${BASE}/bookings/${id}/${action}`, { method: "POST" });
}
