import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
// import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { api } from "../../api/api";

export default function AdminDashboard() {
  const { data } = useFetch(() => api.getDashboardAdmin(), []);

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="System summary and KPIs." />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card><div><div className="text-gray-500">Total Users</div><div className="text-2xl font-bold">{data?.kpis?.total_users ?? "—"}</div></div></Card>
        <Card><div><div className="text-gray-500">Providers</div><div className="text-2xl font-bold">{data?.kpis?.total_providers ?? "—"}</div></div></Card>
        <Card><div><div className="text-gray-500">Services</div><div className="text-2xl font-bold">{data?.kpis?.total_services ?? "—"}</div></div></Card>
        <Card><div><div className="text-gray-500">Bookings</div><div className="text-2xl font-bold">{data?.kpis?.total_bookings ?? "—"}</div></div></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Bookings Trend</h3>
            <div className="text-gray-500">(Chart placeholder — integrate chart lib like Recharts or Chart.js)</div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-3">Top Providers by Earnings</h3>
            <ul>
              {data?.top_providers_by_earnings?.map(p => (
                <li key={p.provider_id} className="py-2 border-t last:border-b-0">
                  <div className="flex justify-between">
                    <div>{p.provider_name}</div>
                    <div className="font-semibold">₹{p.total_earnings}</div>
                  </div>
                  <div className="text-sm text-gray-500">Completed: {p.completed_bookings}</div>
                </li>
              )) ?? <div className="text-gray-500">No data</div>}
            </ul>
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="text-lg font-semibold mb-3">Bookings by Status</h3>
            <ul className="space-y-2">
              {data?.bookings_by_status
                ? Object.entries(data.bookings_by_status).map(([k, v]) => (
                    <li key={k} className="flex justify-between">
                      <span className="capitalize">{k}</span>
                      <span className="font-semibold">{v}</span>
                    </li>
                  ))
                : <div className="text-gray-500">No data</div>}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
