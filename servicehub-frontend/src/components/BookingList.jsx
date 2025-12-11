export default function BookingList({ bookings }) {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
  
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b text-sm">
                <td className="py-2">{b.customer_name}</td>
                <td>{b.service_name}</td>
                <td>{b.booking_date}</td>
                <td>{b.booking_time}</td>
                <td>
                  <span className="px-2 py-1 rounded bg-gray-100">
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  