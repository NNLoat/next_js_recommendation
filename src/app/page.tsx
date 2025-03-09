"use client";
import Navbar from "@/components/navbar_custom";
// import ProductCard from "@/components/productCard";
import ProductCarousel from "@/components/productCarousel";
import AboutUsCard from "@/components/aboutUsCard"; // Adjust path as necessary
import GoogleMapEmbed from "@/components/googleMapEmbed"
import BestProduct from "@/components/bestSeller";
import { Product } from "@/types/product"; // Adjust the path based on your project structure
import { useEffect, useState } from "react";
// import Image from "next/image";





export default function Home() {
  const navLinks = [
    { label: "ท่อ", href: "/pipe" },
    { label: "ปูนผง", href: "/cement" },
    { label: "คอนกรีตผสมเสร็จ", href: "/concrete" },
    { label: "เหล็กเส้น", href: "/Metal" },
  ];

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/best_selling")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching best-selling products:", err));
  }, []);


  return (
    <div className="w-full">
      {/* Content Below the Hero Section */}
              <BestProduct />
              <div className="p-8 w-full">
                <ProductCarousel products={products} />
              </div>
              <div className="p-8">
              <AboutUsCard />
              </div>
              <div className=" p-2 flex justify-center items-center w-full">
              <GoogleMapEmbed />
              </div>
              
              <div className="space-y-6 p-8 flex justify-center items-center">
              
              <div className="space-y-4">
              <h3 className="text-xl font-medium">บริษัท โลหะกิจอุดร จำกัด</h3>
                <p>
                  <span className="font-medium">หมวดหมู่ :</span> วัสดุก่อสร้าง
                </p>
                <p>
                  <span className="font-medium">ที่อยู่ :</span> 530/3-7 ถนนโพศรี ตำบลหมากแข้ง อำเภอเมืองอุดรธานี จังหวัดอุดรธานี
                  41000
                </p>
                <p>
                  <span className="font-medium">โทรศัพท์ :</span> 0-4224-8047-8, 08-1873-3912
                </p>
                <p>
                  <span className="font-medium">แฟกซ์ :</span> 0-4234-2230
                </p>
                <p>
                  <span className="font-medium">เวลาทำการ :</span> ทำการทุกวัน เวลา 08:00-18:00
                </p>
              </div>
              </div>

      {/* <footer className="p-4 text-center border-t">
        © {new Date().getFullYear()} My Website. All rights reserved.
      </footer> */}
    </div>
  );
}
