import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"; // Import ShadCN components

interface ProductCardProps {
    image: string;
    name: string;
    price: string;
  }

  const ProductCard = ({ image, name, price }: ProductCardProps) => {
    return (
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Centering in the Card */}
        <CardHeader className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover rounded-t-lg" // Makes image cover the top portion
          />
        </CardHeader>
  
        {/* Product Details */}
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-xl font-semibold text-gray-700 mt-2">{price}</p>
        </CardContent>
  
        {/* Footer for additional info (optional) */}
        <CardFooter className="flex justify-start p-4">
          {/* Example of adding a button */}
          {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add to Cart
          </button> */}
        </CardFooter>
      </Card>
    );
  };
  
  export default ProductCard;