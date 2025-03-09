// "use client";

// import { useState, useEffect } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Product } from "@/types/product";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Import your carousel

// const fastapi_url = '127.0.0.1'

// export default function ProductCard({ product_id, product_name, price, image_thumb, unit, product_description_thai }: Product) {
//   const [open, setOpen] = useState(false);
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     async function fetchRelatedProducts() {
//       try {
//         const res = await fetch(`http://${fastapi_url}:8000/recommendation/?item_id=${product_id}`);
//         const data = await res.json();
//         const relatedIds: string[] = data.item;
//         // const relatedIds: string[] = await res.json();
//         console.log(relatedIds)

//         if (relatedIds.length > 0) {
//           const productRes = await fetch(`/api/products?ids=${relatedIds.join(",")}`);
//           const data = await productRes.json();
//           const products: Product[] = data.products
//           setRelatedProducts(products);
//           console.log(relatedProducts)
//         }
      
        

//       } catch (error) {
//         console.error("Failed to fetch related products:", error);
//       }
//     }

//     if (open) {
//       fetchRelatedProducts();
//     }
//   }, [open, product_id]);


//  return (
//     <>
//       {/* Clickable Card - Opens Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Card className="cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => setOpen(true)}>
//             <CardContent className="p-4 flex flex-col items-center">
//               <Image src={image_thumb} alt={product_name} width={150} height={150} className="w-full h-48 rounded-md" />
//               <h2 className="text-lg font-bold mt-2">{product_name}</h2>
//               <p className="text-gray-600">{price} {unit}</p>
//             </CardContent>
//           </Card>
//         </DialogTrigger>

//         {/* Dialog Modal */}
//         <DialogContent className="max-w-4xl overflow-y-scroll max-h-screen">
//           <DialogHeader>
//             <DialogTitle>ข้อมูลสินค้า</DialogTitle>
//           </DialogHeader>
//           <div className="flex flex-col items-center">
//             <Image src={image_thumb} alt={product_name} width={250} height={250} className="rounded-md" />
//             <p className="text-xl font-bold mt-4">{product_name}</p>
//             <p className="text-lg text-gray-700">ราคา: {price} {unit}</p>
//             <p className="text-lg text-gray-700">รหัสสินค้า: {product_id}</p>
//             <p className="text-md text-gray-600 mt-4">{product_description_thai}</p>
//           </div>
//           {/* Related Products Carousel */}
//           {relatedProducts.length > 0 && (
//             <div className="mt-6 p-8">
//               <h4 className="text-lg font-bold mb-2">สินค้าที่เกี่ยวข้อง</h4>
//               <Carousel className="flex">
//               <CarouselContent>
//                 {relatedProducts.map((related) => (
//                   <CarouselItem key={related.product_id} className="md:basis-1/2 lg:basis-1/4">
//                     <div className="p-2 border rounded-lg flex flex-col items-center">
//                       <Image src={related.image_thumb} alt={related.product_name} width={75} height={75} className="rounded-md" />
//                       <p className="text-sm font-semibold mt-2">{related.product_name}</p>
//                       <p className="text-sm text-gray-600">{related.price} {related.unit}</p>
//                     </div>
//                   </CarouselItem>
//                 ))}
//                 </CarouselContent>
//                 <CarouselPrevious />
//                 <CarouselNext />
//               </Carousel>
//             </div>
//           )}

//           <CardFooter className="flex justify-end">
//             <Button onClick={() => setOpen(false)} variant="outline">
//               ปิด
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

const fastapi_url = "127.0.0.1";

export default function ProductCard(initialProduct: Product) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProduct);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchRelatedProducts(product_id: string) {
      try {
        const res = await fetch(`http://${fastapi_url}:8000/recommendation/?item_id=${product_id}`);
        const data = await res.json();
        const relatedIds: string[] = data.item;

        if (relatedIds.length > 0) {
          const productRes = await fetch(`/api/products?ids=${relatedIds.join(",")}`);
          const productData = await productRes.json();
          setRelatedProducts(productData.products);
        } else {
          setRelatedProducts([]); // Clear related products if none are found
        }
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    }

    if (open) {
      fetchRelatedProducts(selectedProduct.product_id);
    }
  }, [open, selectedProduct]);

  // Function to update modal with new product details
  const handleRelatedProductClick = (product: Product) => {
    setSelectedProduct(product); // Update modal with new product
  };

  return (
    <>
      {/* Clickable Card - Opens Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200" onClick={() => setOpen(true)}>
            <CardContent className="p-4 flex flex-col items-center">
              <Image src={initialProduct.image_thumb} alt={initialProduct.product_name} width={150} height={150} className="w-full h-48 rounded-md" />
              <h2 className="text-lg font-bold mt-2">{initialProduct.product_name}</h2>
              <p className="text-gray-600">{initialProduct.price} {initialProduct.unit}</p>
            </CardContent>
          </Card>
        </DialogTrigger>

        {/* Dialog Modal */}
        <DialogContent className="max-w-4xl overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>ข้อมูลสินค้า</DialogTitle>
          </DialogHeader>

          {/* Product Details */}
          <div className="flex flex-col items-center">
            <Image src={selectedProduct.image_thumb} alt={selectedProduct.product_name} width={250} height={250} className="rounded-md" />
            <p className="text-xl font-bold mt-4">{selectedProduct.product_name}</p>
            <p className="text-lg text-gray-700">ราคา: {selectedProduct.price} {selectedProduct.unit}</p>
            <p className="text-lg text-gray-700">รหัสสินค้า: {selectedProduct.product_id}</p>
            <p className="text-md text-gray-600 mt-4">{selectedProduct.product_description_thai}</p>
          </div>

          {/* Related Products Carousel */}
          {relatedProducts.length > 0 && (
            <div className="mt-6 p-8">
              <h4 className="text-lg font-bold mb-2">สินค้าที่เกี่ยวข้อง</h4>
              <Carousel className="flex">
                <CarouselContent>
                  {relatedProducts.map((related) => (
                    <CarouselItem key={related.product_id} className="md:basis-1/2 lg:basis-1/4">
                      <div 
                        className="p-2 border rounded-lg flex flex-col items-center cursor-pointer hover:shadow-lg transition-all duration-200"
                        onClick={() => handleRelatedProductClick(related)} // Update modal on click
                      >
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

          {/* Close Button */}
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
