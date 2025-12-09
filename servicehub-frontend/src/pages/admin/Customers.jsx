import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import useFetch from "../../hooks/useFetch";
import { api } from "../../api/api";
import { Link } from "react-router-dom";

export default function Customers() {
  const { data } = useFetch(() => api.getCustomers(), []);

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "phone", title: "Phone" },
    { key: "actions", title: "Actions", render: (row) => <Link to={`/admin/customers/${row.id}`} className="text-blue-600">View</Link> }
  ];

  return (
    <div>
      <PageHeader title="Customer Management" subtitle="View and manage customers." />
      <Table columns={columns} data={data?.results ?? []} />
    </div>
  );
}
