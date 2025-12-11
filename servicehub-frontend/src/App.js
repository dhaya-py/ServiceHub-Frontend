import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

// Layout
import AdminLayout from "./layouts/AdminLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import Customers from "./pages/admin/Customers";
import CustomerDetail from "./pages/admin/CustomerDetail";


// UNIFIED BOOKINGS PAGE (Tabs: Calendar + List)
import AdminBookingsPage from "./pages/admin/Bookings";

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

          {/* Customers */}
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetail />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
