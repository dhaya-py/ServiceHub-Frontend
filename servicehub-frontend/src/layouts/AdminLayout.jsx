import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
