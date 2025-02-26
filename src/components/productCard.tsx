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

"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   image: string;
// }

interface Product {
  // _id: string; // MongoDB document ID
  product_id: string; // Product ID from MongoDB
  product_name: string; // Product name from MongoDB
  price: number;
  image_thumb: string; // Image field from MongoDB
}


export default function ProductCard({ product_id, product_name, price, image_thumb}: Product) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Clickable Card - Opens Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => setOpen(true)}
          >
            <CardContent className="p-4 flex flex-col items-center">
              <Image src={image_thumb} alt={product_name} width={150} height={150} className="w-full h-48 rounded-md" />
              <h2 className="text-lg font-bold mt-2">{product_name}</h2>
              <p className="text-gray-600">{price}</p>
            </CardContent>
          </Card>
        </DialogTrigger>

        {/* Dialog Modal */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{product_name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <Image src={image_thumb} alt={product_name} width={250} height={250} className="rounded-md" />
            <p className="text-xl text-gray-700 mt-4">{price}</p>
            <p className="text-xl text-gray-700 mt-4">description</p>
          </div>
          <CardFooter className="flex justify-end">
            <Button onClick={() => setOpen(false)} variant="outline">
              Close
            </Button>
          </CardFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
