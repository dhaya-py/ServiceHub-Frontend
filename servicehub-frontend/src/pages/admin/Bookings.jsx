// src/pages/admin/Bookings.jsx
import React, { useEffect, useState, useCallback } from "react";
import BookingCalendar from "../../components/BookingCalendar";
import BookingFilters from "../../components/BookingFilters";
import BookingModal from "../../components/BookingModal";
import BookingList from "../../components/BookingList";

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

  // TAB STATE: "calendar" or "list"
  const [tab, setTab] = useState("calendar");

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
        <BookingFilters providers={providers} onChange={setFilters} />
      </div>

      {/* Tabs */}
      <div className="border-b flex gap-6 text-lg font-medium">
        <button
          className={`pb-2 ${tab === "calendar" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setTab("calendar")}
        >
          Calendar
        </button>

        <button
          className={`pb-2 ${tab === "list" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setTab("list")}
        >
          List
        </button>
      </div>

      {/* CONDITIONAL RENDER */}
      {tab === "calendar" && (
        <div className="bg-white shadow rounded-lg p-4">
          <BookingCalendar bookings={bookings} onSelectEvent={handleSelectBooking} />
        </div>
      )}

      {tab === "list" && (
        <div className="bg-white shadow rounded-lg p-4">
          <BookingList bookings={bookings} />
        </div>
      )}

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
