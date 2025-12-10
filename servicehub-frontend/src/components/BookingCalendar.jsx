// src/components/BookingCalendar.jsx
import React, { useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { parseISO } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale"; // feel free to change
import { format } from "date-fns";
import { dateFnsLocalizer } from "react-big-calendar";
import { fr, enGB } from "date-fns/locale";

import { startOfDay, endOfDay } from "date-fns";

import { useState } from "react";

const locales = {
  "en-US": enUS,
  "en-GB": enGB,
};

const localizer = dateFnsLocalizer({
  format,
  parse: (str, fmt) => parseISO(str),
  startOfWeek: () => 1, // monday as start (0 = Sunday). adjust if needed
  getDay: (date) => date.getDay(),
  locales,
});

/**
 * bookings: array of backend booking objects, each with:
 *  id, service_name, booking_date (YYYY-MM-DD), booking_time (HH:mm:ss) or start/end ISO strings,
 *  duration_minutes, status, customer_name, provider_id, provider_name, amount
 */
export default function BookingCalendar({ bookings = [], onSelectEvent, defaultView = "week" }) {
  // map backend bookings to calendar events
  const events = useMemo(() => {
    return bookings.map((b) => {
      // backend might provide start as ISO or booking_date + booking_time + duration
      let start, end;
      if (b.start_iso) {
        start = parseISO(b.start_iso);
        end = b.end_iso ? parseISO(b.end_iso) : new Date(start.getTime() + (b.duration_minutes || 60) * 60000);
      } else {
        // build from date + time fields
        const dt = `${b.booking_date}T${b.booking_time || "09:00:00"}`;
        start = parseISO(dt);
        end = new Date(start.getTime() + (b.duration_minutes || 60) * 60000);
      }

      const title = `${b.service_name} — ${b.customer_name ?? "Customer"}`;
      return {
        id: b.id,
        title,
        start,
        end,
        booking: b, // keep the raw booking object
        status: b.status,
      };
    });
  }, [bookings]);

  // status color classes (tailwind style) - you can map to custom CSS if preferred
  function eventStyleGetter(event) {
    const status = event.status || "pending";
    let bg = "bg-yellow-200";
    if (status === "accepted") bg = "bg-green-200";
    else if (status === "pending") bg = "bg-yellow-200";
    else if (status === "completed") bg = "bg-blue-200";
    else if (status === "canceled" || status === "rejected") bg = "bg-red-200";
    const style = {
      backgroundColor: undefined, // we'll use className
      borderRadius: "6px",
      border: "none",
      color: "#111827",
      padding: "3px",
    };
    return {
      style,
      className: `rbc-event ${bg} border-gray-200`,
    };
  }

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
        onSelectEvent={(ev) => onSelectEvent && onSelectEvent(ev.booking)}
        eventPropGetter={eventStyleGetter}
        selectable
      />
    </div>
  );
}
