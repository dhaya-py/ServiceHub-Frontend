// src/components/BookingCalendar.jsx
import { useMemo } from "react";
import { Calendar } from "react-big-calendar";
import {
  parseISO,
  format,
  startOfWeek,
  getDay
} from "date-fns";
import { enUS } from "date-fns/locale";
import { dateFnsLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

// REQUIRED date-fns localizer config
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse: (value) => {
    // FIX 1 — If value is already a Date, return it
    if (value instanceof Date) return value;

    // FIX 2 — If value is ISO string, parse it safely
    if (typeof value === "string") {
      const parsed = parseISO(value);
      if (!isNaN(parsed)) return parsed;
    }

    // FIX 3 — fallback = today (prevents crash)
    return new Date();
  },
  startOfWeek: (date) => startOfWeek(date, { locale: enUS }),
  getDay: (date) => getDay(date),
  locales,
});

export default function BookingCalendar({ bookings }) {
  const events = useMemo(() => {
    return bookings
      .map((b) => {
        try {
          const start = parseISO(
            b.start_iso ?? `${b.booking_date}T${b.booking_time || "09:00:00"}`
          );

          const end = b.end_iso
            ? parseISO(b.end_iso)
            : new Date(start.getTime() + (b.duration_minutes || 60) * 60000);

          if (isNaN(start) || isNaN(end)) return null;

          return {
            id: b.id,
            title: `${b.service_name || "Service"} — ${b.customer_name || ""}`,
            start,
            end,
            status: b.status,
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  }, [bookings]);

  const eventStyleGetter = (event) => {
    const colors = {
      accepted: "bg-green-200",
      pending: "bg-yellow-200",
      completed: "bg-blue-200",
      canceled: "bg-red-200",
      rejected: "bg-red-200",
    };

    return {
      className: `p-1 rounded ${colors[event.status] || "bg-gray-200"}`,
    };
  };

  return (
    <div className="h-[75vh]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["month", "week", "day"]}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
