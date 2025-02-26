import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Product from "@/models/product";
import BestSellingCement from "@/models/bestSellingCement"; // New model

export async function GET(req: NextRequest) {
    try {
        await connectToDB();

        // 1️⃣ Fetch Best-Selling Cement Products from `BestSellingCement`
        const bestSellingCement = await BestSellingCement.aggregate([
            {
                $lookup: {
                    from: "products", // Join with "products"
                    localField: "product_id",
                    foreignField: "product_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" }, // Flatten array
            { $sort: { rank: 1 } }, // Sort by rank (best-selling)
            {
                $project: { // Only return necessary fields
                    _id: "$productDetails._id",
                    product_id: "$productDetails.product_id",
                    product_name: "$productDetails.product_name",
                    price: "$productDetails.price",
                    image_thumb: "$productDetails.image_thumb",
                    rank: 1
                }
            }
        ]);

        // 2️⃣ Fetch All Cement Products
        const allCementProducts = await Product.find({ product_type: "ปูนถุง" }).select(
            "_id product_id product_name price image_thumb"
        );

        return NextResponse.json({
            bestSellingCement,
            allCementProducts
        });

    } catch (error) {
        console.error("Error fetching cement products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
