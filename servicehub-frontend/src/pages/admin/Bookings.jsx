import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";

export default function Bookings() {
  return (
    <div>
      <PageHeader title="Bookings" subtitle="Daily calendar & slots" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <input type="date" className="w-full p-2 border rounded" />
            <div className="mt-4">Filter: Provider, Service, Status</div>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card>
            <div className="text-gray-500">Calendar grid placeholder — integrate FullCalendar or custom grid.</div>
            {/* Example simple time slots list */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded">08:00 - 09:00</div>
              <div className="p-4 bg-gray-50 rounded">09:00 - 10:00</div>
              <div className="p-4 bg-gray-50 rounded">10:00 - 11:00</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
