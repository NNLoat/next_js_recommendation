"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard";
import ProductGrid from "@/components/productGrid";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/search?query=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Error fetching search results:", err));
    }
  }, [query]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
