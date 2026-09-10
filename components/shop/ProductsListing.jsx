"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

export default function ProductsListing({ initialProducts, categories, brands, categorySlug }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recommended");
  const [brandId, setBrandId] = useState("");
  const [filterCategory, setFilterCategory] = useState(categorySlug || "");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [stockFilter, setStockFilter] = useState("all");

  const parentCategories = categories.filter((c) => !c.parent_id);
  const childCategories = categories.filter((c) => c.parent_id);

  const filtered = useMemo(() => {
    let list = [...initialProducts];
    if (filterCategory) {
      const cat = categories.find((c) => c.slug === filterCategory);
      if (cat) {
        const ids = categories.filter((c) => c.id === cat.id || c.parent_id === cat.id).map((c) => c.id);
        list = list.filter((p) => ids.includes(p.category_id));
      }
    }
    if (brandId) list = list.filter((p) => p.brand_id === Number(brandId));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          categories.find((c) => c.id === p.category_id)?.name.toLowerCase().includes(q)
      );
    }
    if (stockFilter === "in_stock") {
      list = list.filter((p) => p.stock_type !== "quote" && (p.stock > 0 || p.stock_type === "unlimited"));
    }
    if (sort === "price_asc") list.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
    else if (sort === "price_desc") list.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
    else if (sort === "newest") list.sort((a, b) => b.id - a.id);
    return list;
  }, [initialProducts, filterCategory, brandId, search, sort, stockFilter, categories]);

  const filterProps = {
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
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <input
          type="search"
          placeholder="Ürün, SKU veya kategori ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-navy/15 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
        />
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setFiltersOpen(true)} className="lg:hidden text-sm border border-navy/15 px-4 py-2.5 rounded-sm">
            Filtrele
          </button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-navy/15 rounded-sm px-3 py-2.5 text-sm">
            <option value="recommended">Önerilen</option>
            <option value="price_asc">Fiyat Artan</option>
            <option value="price_desc">Fiyat Azalan</option>
            <option value="newest">En Yeniler</option>
          </select>
        </div>
      </div>
      <p className="text-sm text-gray-light mb-6">{filtered.length} ürün listeleniyor</p>
      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden lg:block">
          <ProductFilters {...filterProps} />
        </aside>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {filtersOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-navy/50" onClick={() => setFiltersOpen(false)} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-white p-6 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-navy">Filtreler</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} className="text-gray">Kapat</button>
            </div>
            <ProductFilters {...filterProps} />
          </div>
        </div>
      )}
    </div>
  );
}
