// src/pages/admin/Bookings.jsx
import React, { useEffect, useState, useCallback } from "react";
import BookingCalendar from "../../components/BookingCalendar";
import BookingFilters from "../../components/BookingFilters";
import BookingModal from "../../components/BookingModal";
import { getBookings, getBookingById, updateBookingStatus } from "../../api/bookings";

export default function AdminBookingsPage() {
  const [filters, setFilters] = useState({});
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Load bookings
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
      alert("Update failed");
    }
  }

  return (
    <div className="p-6 space-y-6">

      {/* Filters Card */}
      <div className="bg-white border shadow-sm rounded-lg p-6">
        <BookingFilters onChange={setFilters} />
      </div>

      {/* Tabs */}
      <div className="border-b flex gap-6 text-lg font-medium">
        <button className="pb-2 border-b-2 border-blue-600 text-blue-600">Calendar</button>
        {/* <button className="pb-2 text-gray-500 hover:text-gray-700">List</button> */}
      </div>

      {/* Calendar */}
      <div className="bg-white border shadow-sm rounded-lg p-4">
        <BookingCalendar bookings={bookings} onSelectEvent={handleSelectBooking} />
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
