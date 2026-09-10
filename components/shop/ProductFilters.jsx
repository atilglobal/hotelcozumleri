"use client";

import { cn } from "@/utils/cn";

export default function ProductFilters({
  categories,
  parentCategories,
  childCategories,
  filterCategory,
  setFilterCategory,
  brandId,
  setBrandId,
  brands,
  stockFilter,
  setStockFilter,
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-navy mb-3">Kategori</h3>
        <ul className="space-y-2">
          <li>
            <button type="button" onClick={() => setFilterCategory("")} className={cn("text-sm", !filterCategory ? "text-blue font-medium" : "text-gray hover:text-navy")}>
              Tümü
            </button>
          </li>
          {parentCategories.map((parent) => (
            <li key={parent.id}>
              <button type="button" onClick={() => setFilterCategory(parent.slug)} className={cn("text-sm font-medium", filterCategory === parent.slug ? "text-blue" : "text-navy hover:text-blue")}>
                {parent.name}
              </button>
              <ul className="ml-3 mt-1 space-y-1">
                {childCategories.filter((c) => c.parent_id === parent.id).map((child) => (
                  <li key={child.id}>
                    <button type="button" onClick={() => setFilterCategory(child.slug)} className={cn("text-sm", filterCategory === child.slug ? "text-blue" : "text-gray-light hover:text-navy")}>
                      {child.name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-navy mb-3">Marka</h3>
        <select value={brandId} onChange={(e) => setBrandId(e.target.value)} className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm">
          <option value="">Tüm markalar</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>
      <div>
        <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-navy mb-3">Stok</h3>
        <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm">
          <option value="all">Tümü</option>
          <option value="in_stock">Stokta olanlar</option>
        </select>
      </div>
    </div>
  );
}
