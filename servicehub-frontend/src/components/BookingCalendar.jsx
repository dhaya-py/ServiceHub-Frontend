// src/components/BookingCalendar.jsx
import { useMemo } from "react";
import { Calendar } from "react-big-calendar";
import { parseISO, format, startOfWeek, getDay } from "date-fns";
import { dateFnsLocalizer } from "react-big-calendar";
import { enUS } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse: (str) => parseISO(str),
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function BookingCalendar({ bookings = [], onSelectEvent }) {
  const events = useMemo(() => {
    return bookings
      .map((b) => {
        try {
          const start = parseISO(b.start_iso ?? `${b.booking_date}T${b.booking_time}`);
          const end =
            b.end_iso
              ? parseISO(b.end_iso)
              : new Date(start.getTime() + (b.duration_minutes || 60) * 60000);

          if (isNaN(start) || isNaN(end)) return null;

          return {
            id: b.id,
            title: `${b.service_name} — ${b.customer_name}`,
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

  return (
    <div className="w-full border rounded-md shadow bg-white">
      <div className="h-[600px] overflow-hidden">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={["month", "week", "day"]}
          onSelectEvent={(ev) => onSelectEvent?.(ev)}
        />
      </div>
    </div>
  );
}
