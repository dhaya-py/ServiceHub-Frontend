import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <NavBar />

        {/* CONTENT */}
        <div className="p-8 overflow-auto">
          <h1 className="text-3xl font-semibold mb-4">
            Welcome to <span className="text-blue-600">ServiceHub</span>
          </h1>

          <p className="text-gray-600 mb-6">
            Your central dashboard to manage services, bookings, customers, and
            providers.
          </p>

          {/* SEARCH BAR */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-md p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>

          {/* QUICK ACTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Dashboard */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
              <p className="text-gray-500">View system-wide KPIs and analytics.</p>
            </div>

            {/* Bookings */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">Bookings</h2>
              <p className="text-gray-500">Manage all service bookings.</p>
            </div>

            {/* Providers */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">Providers</h2>
              <p className="text-gray-500">Manage provider profiles and schedules.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
