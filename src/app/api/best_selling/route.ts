import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import BestSelling from "@/models/bestSelling"; // Model for best_selling_all_product
import Product from "@/models/product"; // Model for products

export async function GET(req: NextRequest) {
    try {
      await connectToDB();
  
      // Perform aggregation to join `best_selling_all_product` with `products` on `product_id`
      const bestSellingProducts = await BestSelling.aggregate([
        {
          $lookup: {
            from: "products", // Collection name of `products`
            localField: "product_id",
            foreignField: "product_id",
            as: "productDetails",
          },
        },
        { $unwind: "$productDetails" }, // Convert array to object
        { $sort: { rank: 1 } }, // Sort by rank (ascending)
        { 
          $project: { // Select only necessary fields
            _id: "$productDetails._id",
            product_id: "$productDetails.product_id",
            product_name: "$productDetails.product_name",
            price: "$productDetails.price",
            image_thumb: "$productDetails.image_thumb",
            unit: "$productDetails.unit",
            product_description_thai: "$productDetails.product_description_thai",
            rank: 1
          } 
        }
      ]);
  
      return NextResponse.json(bestSellingProducts);
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch best-selling products" }, { status: 500 });
    }
  }