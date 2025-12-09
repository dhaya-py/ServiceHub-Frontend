import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold mb-6">ServiceHub</h2>

        <nav className="space-y-2">
          <Link to="/admin" className="block p-2 hover:bg-gray-200 rounded">
            Dashboard
          </Link>
          <Link to="/admin/bookings" className="block p-2 hover:bg-gray-200 rounded">
            Bookings
          </Link>
          <Link to="/admin/users" className="block p-2 hover:bg-gray-200 rounded">
            Users
          </Link>
          <Link to="/admin/providers" className="block p-2 hover:bg-gray-200 rounded">
            Providers
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
