import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#222b33] text-white min-h-screen p-6">
      <div className="text-2xl font-bold mb-8">Menu</div>

      <nav className="space-y-3">
        <Link to="/" className="block py-2 px-3 rounded hover:bg-[#2e3941]">Home</Link>
        <Link to="/admin" className="block py-2 px-3 rounded hover:bg-[#2e3941]">Admin Dashboard</Link>
        <Link to="/admin/bookings" className="block py-2 px-3 rounded hover:bg-[#2e3941]">Bookings</Link>
        <Link to="/admin/customers" className="block py-2 px-3 rounded hover:bg-[#2e3941]">Customers</Link>
        <Link to="/admin/providers" className="block py-2 px-3 rounded hover:bg-[#2e3941]">Providers</Link>
      </nav>
    </aside>
  );
}
