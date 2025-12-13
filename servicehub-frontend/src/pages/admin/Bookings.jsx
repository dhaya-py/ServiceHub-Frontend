import { useEffect, useState, useCallback } from "react";
import BookingCalendar from "../../components/BookingCalendar";
import BookingFilters from "../../components/BookingFilters";
import BookingList from "../../components/BookingList";
import BookingModal from "../../components/BookingModal";
import { getBookings, getBookingById, updateBookingStatus } from "../../api/bookings";

export default function AdminBookingsPage() {
  const [filters, setFilters] = useState({});
  const [bookings, setBookings] = useState([]);
  const [view, setView] = useState("calendar");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const loadBookings = useCallback(async () => {
    const res = await getBookings(filters);
    setBookings(res?.data || res);
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
  }

  async function handleAction(action, booking) {
    await updateBookingStatus(booking.id, action);
    setSelectedBooking(null);
    loadBookings();
  }

  return (
    <div className="space-y-6">

      {/* Filters */}
      <div className="bg-white border shadow-sm rounded-lg p-6">
        <BookingFilters onChange={setFilters} />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b text-lg font-medium">
        <button
          onClick={() => setView("calendar")}
          className={`pb-2 ${
            view === "calendar"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Calendar
        </button>

        <button
          onClick={() => setView("list")}
          className={`pb-2 ${
            view === "list"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          List
        </button>
      </div>

      {/* Content */}
      <div className="bg-white border shadow-sm rounded-lg p-4">
        {view === "calendar" ? (
          <BookingCalendar
            bookings={bookings}
            onSelectEvent={handleSelectBooking}
          />
        ) : (
          <BookingList bookings={bookings} />
        )}
      </div>

      {/* Modal */}
      <BookingModal
        isOpen={!!selectedBooking}
        onRequestClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
        onAction={handleAction}
      />
    </div>
  );
}
