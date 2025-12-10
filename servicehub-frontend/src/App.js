import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

// Layout
import AdminLayout from "./layouts/AdminLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import Customers from "./pages/admin/Customers";
import CustomerDetail from "./pages/admin/CustomerDetail";

// Legacy bookings list (keep it if you want)
import Bookings from "./pages/admin/Bookings";

// NEW CALENDAR PAGE
import AdminBookingsPage from "./pages/admin/BookingsCalendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>

          {/* Dashboard */}
          <Route index element={<AdminDashboard />} />

          {/* Bookings */}
          <Route path="bookings" element={<AdminBookingsPage />} />

          {/* Optional old bookings table/list */}
          <Route path="bookings/list" element={<Bookings />} />

          {/* Customers */}
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetail />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
