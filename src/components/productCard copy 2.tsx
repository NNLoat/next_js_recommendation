// import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"; // Import ShadCN components

// interface ProductCardProps {
//     image: string;
//     name: string;
//     price: string;
//   }

//   const ProductCard = ({ image, name, price }: ProductCardProps) => {
//     return (
//       <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
//         {/* Image Centering in the Card */}
//         <CardHeader className="relative">
//           <img
//             src={image}
//             alt={name}
//             className="w-full h-48 object-cover rounded-t-lg" // Makes image cover the top portion
//           />
//         </CardHeader>
  
//         {/* Product Details */}
//         <CardContent className="p-4">
//           <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
//           <p className="text-xl font-semibold text-gray-700 mt-2">{price}</p>
//         </CardContent>
  
//         {/* Footer for additional info (optional) */}
//         <CardFooter className="flex justify-start p-4">
//           {/* Example of adding a button */}
//           {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//             Add to Cart
//           </button> */}
//         </CardFooter>
//       </Card>
//     );
//   };
  
//   export default ProductCard;

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   image: string;
// }

// interface Product {
//   // _id: string; // MongoDB document ID
//   product_id: string; // Product ID from MongoDB
//   product_name: string; // Product name from MongoDB
//   price: number;
//   image_thumb: string; // Image field from MongoDB
// }





// "use client";

// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Product } from "@/types/product";





// export default function ProductCard({ product_id, product_name, price, image_thumb, unit, product_description_thai}: Product) {
//   const [open, setOpen] = useState(false);
//   return (
//     <>
//       {/* Clickable Card - Opens Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Card 
//             className="cursor-pointer hover:shadow-lg transition-all duration-200"
//             onClick={() => setOpen(true)}
//           >
//             <CardContent className="p-4 flex flex-col items-center">
//               <Image src={image_thumb} alt={product_name} width={150} height={150} className="w-full h-48 rounded-md" />
//               <h2 className="text-lg font-bold mt-2">{product_name}</h2>
//               <p className="text-gray-600">{price} {unit}</p>
//             </CardContent>
//           </Card>
//         </DialogTrigger>

//         {/* Dialog Modal */}
//         <DialogContent>
//           <DialogHeader>
//             {/* <DialogTitle>{product_name}</DialogTitle> */}
//             <DialogTitle>ข้อมูลสินค้า</DialogTitle>
//           </DialogHeader>
//           <div className="flex flex-col items-center">
//             <Image src={image_thumb} alt={product_name} width={250} height={250} className="rounded-md" />
//             <p className="text-xl text-black-700 mt-4">{product_name}</p>
//             <p className="text-xl text-gray-700 mt-4">ราคา: {price} {unit}</p>
//             <p className="text-xl text-gray-700 mt-4">รหัสสินค้า: {product_id}</p>
//             <p className="text-xl text-gray-700 mt-4">{product_description_thai}</p>
//           </div>
//           <CardFooter className="flex justify-end">
//             <Button onClick={() => setOpen(false)} variant="outline">
//               Close
//             </Button>
//           </CardFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Import your carousel

const fastapi_url = '127.0.0.1'

export default function ProductCard({ product_id, product_name, price, image_thumb, unit, product_description_thai }: Product) {
  const [open, setOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        const res = await fetch(`http://${fastapi_url}:8000/recommendation?item_id=${product_id}`);
        const data = await res.json();
        const relatedIds: string[] = data.item;
        // const relatedIds: string[] = await res.json();

        if (relatedIds.length > 0) {
          const productRes = await fetch(`/api/products?ids=${relatedIds.join(",")}`);
          const data = await productRes.json();
          const products: Product[] = data.products
          setRelatedProducts(products);
        }

      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    }

    if (open) {
      fetchRelatedProducts();
      console.log(relatedProducts)
    }
  }, [open, product_id]);


  return (
    <>
      {/* Clickable Card - Opens Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => setOpen(true)}>
            <CardContent className="p-4 flex flex-col items-center">
              <Image src={image_thumb} alt={product_name} width={150} height={150} className="w-full h-48 rounded-md" />
              <h2 className="text-lg font-bold mt-2">{product_name}</h2>
              <p className="text-gray-600">{price} {unit}</p>
            </CardContent>
          </Card>
        </DialogTrigger>

        {/* Dialog Modal */}
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>ข้อมูลสินค้า</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <Image src={image_thumb} alt={product_name} width={250} height={250} className="rounded-md" />
            <p className="text-xl font-bold mt-4">{product_name}</p>
            <p className="text-lg text-gray-700">ราคา: {price} {unit}</p>
            <p className="text-lg text-gray-700">รหัสสินค้า: {product_id}</p>
            <p className="text-md text-gray-600 mt-4">{product_description_thai}</p>
          </div>
          {/* Related Products Carousel */}
          {relatedProducts.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-bold mb-2">สินค้าที่เกี่ยวข้อง</h4>
              <Carousel>
              <CarouselContent>
                {relatedProducts.map((related) => (
                  <CarouselItem key={related.product_id} className="md:basis-1/2 lg:basis-1/4">
                    <div className="p-2 border rounded-lg flex flex-col items-center">
                      <Image src={related.image_thumb} alt={related.product_name} width={75} height={75} className="rounded-md" />
                      <p className="text-sm font-semibold mt-2">{related.product_name}</p>
                      <p className="text-sm text-gray-600">{related.price} {related.unit}</p>
                    </div>
                  </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}

          <CardFooter className="flex justify-end">
            <Button onClick={() => setOpen(false)} variant="outline">
              ปิด
            </Button>
          </CardFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
