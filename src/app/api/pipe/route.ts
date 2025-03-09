import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Product from "@/models/product";
import BestSellingPipe from "@/models/bestSellingPipe";



export async function GET(req: NextRequest) {
    try {
        await connectToDB();

        const pipeProductIds = await Product.find({ product_type: "ท่อPB" }).distinct("product_id");
        const bestSellingPipe = await BestSellingPipe.aggregate([
            {
                $match: { product_id: { $in: pipeProductIds } }
            },
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
                    unit: "$productDetails.unit",
                    product_description_thai: "$productDetails.product_description_thai",
                    rank: 1
                }
            }
        ]);

        // 2️⃣ Fetch All Cement Products
        const allPipeProducts = await Product.find({ product_type: "ท่อPB" }).select(
            "_id product_id product_name price image_thumb unit product_description_thai"
        );

        return NextResponse.json({
            bestSellingPipe,
            allPipeProducts
        });

    } catch (error) {
        console.error("Error fetching cement products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
