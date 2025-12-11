import React, { useState } from "react";

export default function BookingFilters({ providers = [], onChange }) {
  const [provider, setProvider] = useState("");
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");

  function apply() {
    onChange?.({ provider, status, q });
  }

  function reset() {
    setProvider("");
    setStatus("");
    setQ("");
    onChange?.({ provider: "", status: "", q: "" });
  }

  return (
    <div className="space-y-4">

      <div>
        <label className="text-sm font-medium">Search</label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-blue-200"
          placeholder="Search by customer, service..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div>
          <label className="text-sm font-medium">Provider</label>
          <select
            className="w-full mt-1 p-3 border rounded-md bg-white"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value="">All</option>
            {providers.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Status</label>
          <select
            className="w-full mt-1 p-3 border rounded-md bg-white"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={apply} className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Apply
        </button>
        <button onClick={reset} className="px-5 py-2 border rounded-md hover:bg-gray-100">
          Reset
        </button>
      </div>

    </div>
  );
}
