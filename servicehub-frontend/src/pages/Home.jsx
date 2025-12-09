import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <div className="p-8">
          <PageHeader title="Welcome to ServiceHub" subtitle="Your central dashboard to manage services, bookings, customers, and providers." />
          <div className="mb-6">
            <input className="w-full max-w-lg p-3 rounded border shadow-sm" placeholder="Search..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-xl font-semibold">Dashboard</h3>
              <p className="text-gray-500 mt-2">View system-wide KPIs and analytics.</p>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold">Bookings</h3>
              <p className="text-gray-500 mt-2">Manage all service bookings.</p>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold">Providers</h3>
              <p className="text-gray-500 mt-2">Manage provider profiles and schedules.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
