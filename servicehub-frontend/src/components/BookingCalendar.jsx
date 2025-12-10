// src/components/BookingCalendar.jsx
import React, { useMemo } from "react";
import { Calendar } from "react-big-calendar";
import { parseISO, format } from "date-fns";
import { enUS, enGB } from "date-fns/locale";
import { dateFnsLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

// Date-fns locales
const locales = {
  "en-US": enUS,
  "en-GB": enGB,
};

// Localizer for react-big-calendar (date-fns version)
const localizer = dateFnsLocalizer({
  format,
  parse: (str) => parseISO(str),
  startOfWeek: () => 1, // Monday
  getDay: (date) => date.getDay(),
  locales,
});

/**
 * bookings: array of backend booking objects, each with:
 *  id, service_name, booking_date, booking_time, duration_minutes,
 *  status, customer_name, provider_id, provider_name, amount
 */
export default function BookingCalendar({
  bookings = [],
  onSelectEvent,
  defaultView = "week",
}) {
  // Convert API bookings → Calendar events
  const events = useMemo(() => {
    return bookings.map((b) => {
      let start, end;

      if (b.start_iso) {
        // If backend provides ISO dates
        start = parseISO(b.start_iso);
        end = b.end_iso ? parseISO(b.end_iso) : new Date(start.getTime() + ((b.duration_minutes || 60) * 60000));
      } else {
        // Construct from booking_date + booking_time
        const dt = `${b.booking_date}T${b.booking_time || "09:00:00"}`;
        start = parseISO(dt);
        end = new Date(start.getTime() + ((b.duration_minutes || 60) * 60000));
      }

      return {
        id: b.id,
        title: `${b.service_name} — ${b.customer_name ?? "Customer"}`,
        start,
        end,
        booking: b,
        status: b.status,
      };
    });
  }, [bookings]);

  // Tailwind-style event colors based on booking status
  const eventStyleGetter = (event) => {
    const status = event.status ?? "pending";

    let bg = "bg-yellow-200";
    if (status === "accepted") bg = "bg-green-200";
    if (status === "completed") bg = "bg-blue-200";
    if (["canceled", "rejected"].includes(status)) bg = "bg-red-200";

    return {
      style: {
        borderRadius: "6px",
        border: "none",
        color: "#111827",
        padding: "3px",
      },
      className: `rbc-event ${bg} border-gray-200`,
    };
  };

  return (
    <div className="h-[75vh]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={defaultView}
        views={["month", "week", "day", "agenda"]}
        popup
        selectable
        onSelectEvent={(ev) => onSelectEvent && onSelectEvent(ev.booking)}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
