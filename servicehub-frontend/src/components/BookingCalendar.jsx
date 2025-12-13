import { useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parseISO, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function BookingCalendar({ bookings = [], onSelectEvent }) {
  const events = useMemo(() => {
    return bookings
      .map((b) => {
        const start = new Date(
          b.start_iso ??
            `${b.booking_date}T${b.booking_time ?? "09:00"}`
        );

        if (isNaN(start.getTime())) return null;

        const end = new Date(
          start.getTime() + (b.duration_minutes ?? 60) * 60000
        );

        return {
          id: b.id,
          title: `${b.service_name} — ${b.customer_name}`,
          start,
          end,
          booking: b,
        };
      })
      .filter(Boolean);
  }, [bookings]);

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["month", "week", "day"]}
        popup
        onSelectEvent={(e) => onSelectEvent?.(e.booking)}
      />
    </div>
  );
}
