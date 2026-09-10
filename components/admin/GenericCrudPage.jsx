"use client";

import { useEffect, useState } from "react";
import DataTable from "./DataTable";

import { useRouter } from "next/navigation";

export default function GenericCrudPage({ apiPath, columns, title, emptyMessage, onRowClick, detailPath, toolbar }) {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch(apiPath).then((r) => r.json()).then((d) => {
      const key = Object.keys(d).find((k) => Array.isArray(d[k]) && k !== "charts");
      setRows(key ? d[key] : []);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { queueMicrotask(() => load()); }, [apiPath]);

  return (
    <div className="space-y-4">
      {toolbar}
      <DataTable
        loading={loading}
        columns={columns}
        rows={rows}
        emptyMessage={emptyMessage}
        onRowClick={onRowClick || (detailPath ? (row) => router.push(detailPath.replace("{id}", row.id)) : undefined)}
      />
    </div>
  );
}
