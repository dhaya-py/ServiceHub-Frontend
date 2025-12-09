import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-full p-6">
      <div className="text-2xl font-bold mb-8">Menu</div>

      <ul className="space-y-4">
        <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
        <li><Link to="/admin" className="hover:text-blue-300">Admin Dashboard</Link></li>
        <li><Link to="/admin/bookings" className="hover:text-blue-300">Bookings</Link></li>
        <li><Link to="/admin/users" className="hover:text-blue-300">Users</Link></li>
        <li><Link to="/admin/providers" className="hover:text-blue-300">Providers</Link></li>
      </ul>
    </div>
  );
}
