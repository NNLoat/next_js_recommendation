"use client";
import ProductCarousel from "@/components/productCarousel";
import ProductGrid from "@/components/productGrid";
import BestProduct from "@/components/bestSeller";
import { Product } from "@/types/product"; // Adjust the path based on your project structure
import { useEffect, useState } from "react";


export default function cement() {
  const [bestSellingCement, setBestSellingCement] = useState<Product[]>([]);
  const [allCementProducts, setAllCementProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cement")
      .then((res) => res.json())
      .then((data) => {
        setBestSellingCement(data.bestSellingCement);
        setAllCementProducts(data.allCementProducts);
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
      
      {/* Best-Selling Cement Product Carousel */}
      <div className="p-8 w-full">
        {loading ? <p>Loading best-selling products...</p> : <ProductCarousel products={bestSellingCement} />}
      </div>

      {/* Title for All Cement Products */}
      <div className="flex items-center justify-center my-8">
        <span className="mx-4 text-black-700 text-xl font-semibold">ปูนถุง</span>
      </div>

      {/* All Cement Products Grid */}
      <div className="p-8 w-full">
        {loading ? <p>Loading all cement products...</p> : <ProductGrid products={allCementProducts} />}
      </div>
    </div>
  );
    // return (
    //     <div className="w-full">
    //          <BestProduct />
    //           <div className="p-8 w-full">
    //             <ProductCarousel products={products} />
    //           </div>
    //           <div className="flex items-center justify-center my-8">
    //           <span className="mx-4 text-blacks-700 text-xl font-semibold">ปูนถุง</span>
    //           </div>
    //           <ProductGrid products={products} />
    //     </div>
    // )
}