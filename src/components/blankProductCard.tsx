import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"; // Import ShadCN components

const BlankProductCard = () => {
  return (
    <Card className="bg-transparent shadow-none border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
      {/* Keep the header size the same as the ProductCard */}
      <CardHeader className="relative h-48">
        {/* Empty content, just maintain the size */}
      </CardHeader>

      {/* The Card Content */}
      <CardContent className="p-4 text-transparent">
        {/* Empty, but the same padding and size */}
      </CardContent>

      {/* The Card Footer */}
      <CardFooter className="flex justify-start p-4">
        {/* Empty footer, same size as ProductCard */}
      </CardFooter>
    </Card>
  );
};

export default BlankProductCard;
