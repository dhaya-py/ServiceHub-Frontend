// src/pages/admin/Bookings.jsx
import React, { useEffect, useState } from "react";
import BookingCalendar from "../../components/BookingCalendar";
import BookingFilters from "../../components/BookingFilters";
import BookingModal from "../../components/BookingModal";
import {
  getBookings,
  getBookingById,
  updateBookingStatus
} from "../../api/bookings";

export default function AdminBookingsPage() {
  const [filters, setFilters] = useState({});
  const [bookings, setBookings] = useState([]);
  const [providers] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // FIX: wrap loadBookings in useCallback to avoid warnings + infinite loops
  const loadBookings = useCallback(async () => {
    try {
      const res = await getBookings({ ...filters });
      setBookings(res?.data || res);
    } catch (err) {
      console.error("loadBookings error", err);
    }
  }, [filters]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  async function loadBookings() {
    try {
      const res = await getBookings({ ...filters });
      setBookings(res?.data || res);
    } catch (err) {
      console.error("loadBookings error", err);
    }
  }

  useEffect(() => {
    loadBookings();
  }, [filters]);

  async function handleSelectBooking(booking) {
    try {
      const data = await getBookingById(booking.id);
      setSelectedBooking(data);
    } catch {
      setSelectedBooking(booking);
    }
    setModalOpen(true);
  }

  async function handleAction(action, booking) {
    try {
      await updateBookingStatus(booking.id, action);
      setModalOpen(false);
      loadBookings();
    } catch (err) {
      console.error(err);
      alert("Action failed!");
    }
  }

  return (
    <div className="p-6 space-y-6">
      
      {/* Filters */}
      <div className="max-w-4xl">
        <BookingFilters providers={providers} onChange={(f) => setFilters(f)} />
      </div>

      {/* Calendar only */}
      <div className="bg-white shadow rounded-lg p-4">
        <BookingCalendar
          bookings={bookings}
          onSelectEvent={handleSelectBooking}
        />
      </div>

      {/* Modal */}
      <BookingModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        booking={selectedBooking}
        onAction={handleAction}
      />
    </div>
  );
}
