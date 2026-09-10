"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DataTable from "./DataTable";
import Button from "@/components/ui/Button";

export default function BlogAdmin() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/blog").then((r) => r.json()).then((d) => {
      setPosts(d.posts || []);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { queueMicrotask(() => load()); }, []);

  const columns = [
    { key: "title", label: "Başlık" },
    { key: "category_name", label: "Kategori", render: (v) => v || "—" },
    { key: "status", label: "Durum", render: (v) => ({ draft: "Taslak", published: "Yayında", archived: "Arşiv" }[v] || v) },
    { key: "published_at", label: "Yayın", render: (v) => v ? new Date(v).toLocaleDateString("tr-TR") : "—" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <p className="text-sm text-gray-light">{posts.length} yazı</p>
        <div className="flex gap-2">
          <Button href="/admin/blog/kategoriler" variant="outline" size="sm">Kategoriler</Button>
          <Button href="/admin/blog/yeni" variant="primary" size="sm">Yeni Yazı</Button>
        </div>
      </div>
      <DataTable
        loading={loading}
        columns={columns}
        rows={posts}
        emptyMessage="Henüz blog yazısı yok."
        onRowClick={(row) => router.push(`/admin/blog/${row.id}`)}
      />
    </div>
  );
}
