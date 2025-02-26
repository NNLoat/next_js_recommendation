import { Card, CardContent } from "@/components/ui/card"; // Import ShadCN components
import Image from "next/image"; // Import Next.js Image component for optimized images

const AboutUsCard = () => {
    return (
      <Card className="flex w-full max-w-5xl mx-auto my-8 rounded-lg shadow-lg overflow-hidden">
        {/* Left side: Image */}
        <div className="w-1/2 relative">
          <Image
            src="/images/about-us.jpg" // Replace with your image path
            alt="About Us"
            layout="fill"
            objectFit="cover"
            className="rounded-l-lg"
          />
        </div>
        {/* Right side: Text */}
        <CardContent className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800">About Us</h2>
          <p className="mt-4 text-gray-700 text-lg">
          โลหะกิจอุดร ตัวแทนจำหน่ายปูนซีเมนต์ วัสดุก่อสร้าง ส่งตรงถึงบ้าน จำหน่ายเหล็กเส้น ท่อ PVC ท่อ PB ตรา UHM
          </p>
          <p className="mt-2 text-gray-600">
          จำหน่ายปูนซีเมนต์ วัสดุก่อสร้าง เหล็กเส้น ท่อ PVC ท่อ PB ตรา UHM และสินค้าในเครือบริษัทปูนซีเมนต์ไทย 
          </p>
        </CardContent>
      </Card>
    );
  };
  
  export default AboutUsCard;