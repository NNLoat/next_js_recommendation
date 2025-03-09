"use client";
import ProductCarousel from "@/components/productCarousel";
import ProductGrid from "@/components/productGrid";
import BestProduct from "@/components/bestSeller";
import { Product } from "@/types/product"; // Adjust the path based on your project structure
import { useEffect, useState } from "react";

export default function Concrete() {
  const [bestSellingConcrete, setBestSellingConcrete] = useState<Product[]>([]);
  const [allConcreteProducts, setAllConcreteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/concrete")
      .then((res) => res.json())
      .then((data) => {
        setBestSellingConcrete(data.bestSellingConcrete);
        setAllConcreteProducts(data.allConcreteProducts);
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
      
      {/* Best-Selling Concrete Product Carousel */}
      <div className="p-8 w-full">
        {loading ? <p>Loading best-selling products...</p> : <ProductCarousel products={bestSellingConcrete} />}
      </div>

      {/* Title for All Concrete Products */}
      <div className="flex items-center justify-center my-8">
        <span className="mx-4 text-black-700 text-xl font-semibold">คอนกรีต</span>
      </div>

      {/* All Concrete Products Grid */}
      <div className="p-8 w-full">
        {loading ? <p>Loading all concrete products...</p> : <ProductGrid products={allConcreteProducts} />}
      </div>
    </div>
  );
}
