import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClasses =
    "block px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition";

  const activeClasses =
    "block px-4 py-2 rounded-lg bg-blue-700 text-white shadow";

  return (
    <div className="w-64 bg-gray-900 text-gray-200 h-screen p-6">
      <h2 className="text-2xl font-bold mb-8 tracking-wide">ServiceHub</h2>

      <ul className="space-y-3">

        {/* Home */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClasses : linkClasses
            }
          >
            Home
          </NavLink>
        </li>

        {/* Dashboard */}
        <li>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? activeClasses : linkClasses
            }
          >
            Admin Dashboard
          </NavLink>
        </li>

        {/* Bookings Calendar */}
        <li>
          <NavLink
            to="/admin/bookings"
            className="block px-4 py-2 rounded hover:bg-slate-700"
          >
            Bookings
          </NavLink>
        </li>

        {/* Customers */}
        <li>
          <NavLink
            to="/admin/customers"
            className={({ isActive }) =>
              isActive ? activeClasses : linkClasses
            }
          >
            Customers
          </NavLink>
        </li>

        {/* Providers */}
        <li>
          <NavLink
            to="/admin/providers"
            className={({ isActive }) =>
              isActive ? activeClasses : linkClasses
            }
          >
            Providers
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
