// src/pages/admin/BookingsCalendar.jsx
import React, { useEffect, useState } from "react";
import BookingCalendar from "../../components/BookingCalendar";
import BookingFilters from "../../components/BookingFilters";
import BookingModal from "../../components/BookingModal";
import { getBookings, getBookingById, updateBookingStatus } from "../../api/bookings";

export default function AdminBookingsPage() {
  const [filters, setFilters] = useState({});
  const [bookings, setBookings] = useState([]);
  const [providers, setProviders] = useState([]); // fetch provider list if needed
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loadBookings(rangeStart, rangeEnd) {
    setLoading(true);
    try {
      // for calendar we often fetch a month view; pass start/end from calendar if desired.
      const res = await getBookings({ start: rangeStart, end: rangeEnd, ...filters, per_page: 500 });
      // Expected: res.data = [ {id, start_iso, end_iso, service_name, customer_name, ...} ]
      // If your backend returns differently adapt mapping.
      setBookings(res.data ?? res);
    } catch (err) {
      console.error("loadBookings", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // initial fetch - this is simple: fetch this month
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    loadBookings(start.toISOString().slice(0,10), end.toISOString().slice(0,10));
    // fetch providers for filter (if you have endpoint)
    // fetchProviders();
  }, [filters]); // reload whenever filters change

  async function handleSelectBooking(booking) {
    // optionally fetch fresh details
    try {
      const data = await getBookingById(booking.id);
      setSelectedBooking(data);
      setModalOpen(true);
    } catch (e) {
      setSelectedBooking(booking);
      setModalOpen(true);
    }
  }

  async function handleAction(action, booking) {
    try {
      await updateBookingStatus(booking.id, action);
      // refresh bookings
      setModalOpen(false);
      // reload current rendered bookings; simple approach: refetch month
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      loadBookings(start.toISOString().slice(0,10), end.toISOString().slice(0,10));
    } catch (err) {
      console.error(err);
      alert("Action failed: " + err.message);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
        <BookingFilters providers={providers} onChange={(f) => setFilters(f)} />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Bookings Calendar</h1>
            <div>
              {/* add quick actions if you want */}
            </div>
          </div>

          <BookingCalendar bookings={bookings} onSelectEvent={handleSelectBooking} />
        </div>
      </div>

      <BookingModal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} booking={selectedBooking} onAction={handleAction} />
    </div>
  );
}
