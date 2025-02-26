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

  // const products = [
  //   { _id: "1", product_id: "1", product_name: "Product 1", price: 29.99, image_thumb: "/images/product1.jpg" },
  //   { _id: "2", product_id: "2", product_name: "Product 2", price: 49.99, image_thumb: "/images/product2.jpg" },
  //   { _id: "3", product_id: "3", product_name: "Product 3", price: 39.99, image_thumb: "/images/product3.jpg" },
  //   { _id: "4", product_id: "4",  product_name: "Product 4", price: 19.99, image_thumb: "/images/product4.jpg" },
  //   { _id: "5", product_id: "5", product_name: "Product 5", price: 59.99, image_thumb: "/images/product5.jpg" },
  //   { _id: "6", product_id: "6", product_name: "Product 6", price: 89.99, image_thumb: "/images/product6.jpg" },
  //   { _id: "7", product_id: "7", product_name: "Product 7", price: 69.99, image_thumb: "/images/product7.jpg" },
  //   { _id: "8", product_id: "8", product_name: "Product 8", price: 79.99, image_thumb: "/images/product8.jpg" },
  //   { _id: "9", product_id: "9", product_name: "Product 9", price: 99.99, image_thumb: "/images/product9.jpg" },
  //   { _id: "10", product_id: "10", product_name: "Product 10", price: 129.99, image_thumb: "/images/product10.jpg" },
  // ];
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
              
              <div className="space-y-6 p-8">
              <h3 className="text-xl font-medium">บริษัท โลหะกิจอุดร จำกัด</h3>
              <div className="space-y-4">
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
