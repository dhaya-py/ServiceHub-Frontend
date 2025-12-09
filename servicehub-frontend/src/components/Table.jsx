export default function Table({ columns, data = [] }) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => <th key={col.key} className="p-4 text-sm text-gray-600">{col.title}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-t">
                {columns.map(col => (
                  <td key={col.key} className="p-4">{col.render ? col.render(row) : row[col.key]}</td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td className="p-6 text-center text-gray-500" colSpan={columns.length}>No data</td></tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  