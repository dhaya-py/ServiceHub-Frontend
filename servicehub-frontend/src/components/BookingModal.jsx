// src/components/BookingModal.jsx
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // required for accessibility

export default function BookingModal({ isOpen, onRequestClose, booking, onAction }) {
  if (!booking) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="max-w-2xl mx-auto mt-20 bg-white rounded shadow p-6 outline-none"
      overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center"
    >
      <div>
        <h2 className="text-2xl font-semibold mb-1">{booking.service_name}</h2>
        <div className="text-sm text-gray-500 mb-4">Booking #{booking.id} — {booking.status}</div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-400">Customer</div>
            <div className="font-medium">{booking.customer_name}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Provider</div>
            <div className="font-medium">{booking.provider_name}</div>
          </div>

          <div>
            <div className="text-xs text-gray-400">Date & Time</div>
            <div>{booking.booking_date} {booking.booking_time}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Amount</div>
            <div>₹{booking.amount}</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-1">Address</div>
          <div>{booking.address}</div>
        </div>

        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            {booking.status === "pending" && (
              <>
                <button onClick={() => onAction("accept", booking)} className="px-4 py-2 bg-green-600 text-white rounded">Accept</button>
                <button onClick={() => onAction("reject", booking)} className="px-4 py-2 bg-red-600 text-white rounded">Reject</button>
              </>
            )}

            {booking.status === "accepted" && (
              <button onClick={() => onAction("complete", booking)} className="px-4 py-2 bg-blue-600 text-white rounded">Complete</button>
            )}

            {(booking.status === "pending" || booking.status === "accepted") && (
              <button onClick={() => onAction("cancel", booking)} className="px-4 py-2 border rounded">Cancel</button>
            )}
          </div>

          <div>
            <button onClick={onRequestClose} className="px-4 py-2 border rounded">Close</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
