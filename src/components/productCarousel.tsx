"use client"
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Import updated Carousel components
import ProductCard from "./productCard"; // Import your ProductCard component

interface Product {
  _id: string; // MongoDB document ID
  product_id: string; // Product ID from MongoDB
  product_name: string; // Product name from MongoDB
  price: number;
  image_thumb: string; // Image field from MongoDB
}

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
    return (
      <div className="carousel-container">
        <Carousel opts={{ align: "start" }} className="w-[90%] mx-auto">
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product._id} className="md:basis-1/2 lg:basis-1/5">
                <div className="p-1">
                  <ProductCard
                    product_id={product.product_id}
                    image_thumb={product.image_thumb}
                    product_name={product.product_name}
                    price={product.price}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  };
  
  export default ProductCarousel;

// const ProductCarousel = ({ products }: ProductCarouselProps) => {
//   return (
//     <div className="carousel-container">
//       <Carousel opts={{ align: "start" }} className="w-full mx-auto">
//   <CarouselContent>
//     <div className="flex">
//       {products.map((product) => (
//         <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
//           <ProductCard
//             image={product.image}
//             name={product.name}
//             price={product.price}
//           />
//         </CarouselItem>
//       ))}
//     </div>
//   </CarouselContent>
//   <CarouselPrevious />
//   <CarouselNext />
// </Carousel>
//     </div>
//   );
// };

// export default ProductCarousel;




