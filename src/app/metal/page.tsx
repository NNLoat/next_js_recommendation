"use client";
import ProductCarousel from "@/components/productCarousel";
import ProductGrid from "@/components/productGrid";
import BestProduct from "@/components/bestSeller";
import { Product } from "@/types/product"; // Adjust the path based on your project structure
import { useEffect, useState } from "react";

export default function metal() {
  const [bestSellingMetal, setBestSellingMetal] = useState<Product[]>([]);
  const [allMetalProducts, setAllMetalProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/metal")
      .then((res) => res.json())
      .then((data) => {
        setBestSellingMetal(data.bestSellingMetal);
        setAllMetalProducts(data.allMetalProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full">
      <BestProduct />
      
      {/* Best-Selling Metal Product Carousel */}
      <div className="p-8 w-full">
        {loading ? <p>Loading best-selling products...</p> : <ProductCarousel products={bestSellingMetal} />}
      </div>

      {/* Title for All Metal Products */}
      <div className="flex items-center justify-center my-8">
        <span className="mx-4 text-black-700 text-xl font-semibold">เหล็กเส้น</span>
      </div>

      {/* All Metal Products Grid */}
      <div className="p-8 w-full">
        {loading ? <p>Loading all metal products...</p> : <ProductGrid products={allMetalProducts} />}
      </div>
    </div>
  );
}
