import Navbar from "@/components/navbar_custom";
// import ProductCard from "@/components/productCard";
import ProductCarousel from "@/components/productCarousel";
import AboutUsCard from "@/components/aboutUsCard"; // Adjust path as necessary
import GoogleMapEmbed from "@/components/googleMapEmbed"
import Image from "next/image";





export default function Home() {
  const navLinks = [
    { label: "ท่อ", href: "/pipe" },
    { label: "ปูนผง", href: "/cement" },
    { label: "คอนกรีตผสมเสร็จ", href: "/concrete" },
    { label: "เหล็กเส้น", href: "/Metal" },
  ];

  const products = [
    { id: 1, name: "Product 1", price: "$29.99", image: "/images/product1.jpg" },
    { id: 2, name: "Product 2", price: "$49.99", image: "/images/product2.jpg" },
    { id: 3, name: "Product 3", price: "$39.99", image: "/images/product3.jpg" },
    { id: 4, name: "Product 4", price: "$19.99", image: "/images/product4.jpg" },
    { id: 5, name: "Product 5", price: "$59.99", image: "/images/product5.jpg" },
    { id: 6, name: "Product 6", price: "$89.99", image: "/images/product6.jpg" },
    { id: 7, name: "Product 7", price: "$69.99", image: "/images/product7.jpg" },
    { id: 8, name: "Product 8", price: "$79.99", image: "/images/product8.jpg" },
    { id: 9, name: "Product 9", price: "$99.99", image: "/images/product9.jpg" },
    { id: 10, name: "Product 10", price: "$129.99", image: "/images/product10.jpg" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Hero Section with Fixed Background */}
      {/* <div className="relative w-full h-[50vh] overflow-hidden">
        <Image
          src="/building_home.png" // Replace with your image path
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
        //   className="absolute top-0 left-0 w-full h-full z-0"
        />
      </div> */}

      {/* Text Overlay */}
      <div className="absolute top-0 left-0 w-full h-[60vh] flex items-center justify-center z-10">
          {/* absolute: positions the div absolutely in relation to its parent */}
          {/* top-0 left-0: positions the text overlay at the top-left */}
          {/* w-full h-full: makes the overlay cover the full hero area */}
          {/* flex: uses flexbox to center the text */}
          {/* items-center: vertically centers the text */}
          {/* justify-center: horizontally centers the text */}
          {/* z-10: ensures the text is above the hero image */}

          {/* <p className="text-white text-6xl italic">
            Lohakit Udon
            </p> */}
        </div>

      {/* Navbar */}
      {/* <Navbar links={navLinks} /> */}

      {/* Content Below the Hero Section */}
      <main className="relative z-10 flex flex-col justify-center items-center pt-[2vh] bg-white w-full"> {/* Content starts below the hero */}
              <div className="flex items-center justify-center my-8">
                  <div className="border-t border-gray-300 w-64"></div>
                  <span className="mx-4 text-gray-700 font-semibold">Best Product</span>
                  <div className="border-t border-gray-300 w-64"></div>
              </div>
              <div className="p-8">
                <ProductCarousel products={products} />
                
              </div>
              <div className="p-8">
              <AboutUsCard />
              </div>
              <div className=" p-2 flex flex-col justify-center items-center">
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

      </main>

      <footer className="p-4 text-center border-t">
        © {new Date().getFullYear()} My Website. All rights reserved.
      </footer>
    </div>
  );
}
