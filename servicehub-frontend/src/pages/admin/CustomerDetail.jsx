import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import useFetch from "../../hooks/useFetch";
import { api } from "../../api/api";
import { useParams } from "react-router-dom";

export default function CustomerDetail() {
  const { id } = useParams();
  const { data } = useFetch(() => api.getCustomer(id), [id]);

  return (
    <div>
      <PageHeader title={`Customer #${id}`} subtitle={data?.company_name} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <div className="text-gray-700">{data?.primary_name ?? "—"}</div>
            <div className="text-gray-500 mt-2">{data?.primary_phone ?? "—"}</div>
          </Card>
          <Card className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Bookings</h3>
            {/* list bookings */}
            <div className="text-gray-500">Booking list placeholder</div>
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="text-lg font-semibold mb-2">Accounts</h3>
            <div className="text-gray-700">Money Owing: ₹{data?.money_owing ?? 0}</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
