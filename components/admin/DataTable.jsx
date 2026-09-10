"use client";

export default function DataTable({ columns, rows, loading, emptyMessage = "Kayıt bulunamadı.", onRowClick }) {
  if (loading) return <div className="bg-white rounded-lg border p-12 text-center text-gray-light">Yükleniyor...</div>;
  if (!rows?.length) return <div className="bg-white rounded-lg border p-12 text-center text-gray-light">{emptyMessage}</div>;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-3 font-medium text-navy whitespace-nowrap">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id || i} className={`border-b border-gray-100 ${onRowClick ? "cursor-pointer hover:bg-blue/5" : ""}`} onClick={() => onRowClick?.(row)}>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray whitespace-nowrap">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
