import React from "react";
import ProductCard from "./productCard"; // Ensure you have the ProductCard component

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


interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="w-[90%] mx-auto mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key = {product.product_id}
            product_id={product.product_id}
            image_thumb={product.image_thumb}
            product_name={product.product_name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
