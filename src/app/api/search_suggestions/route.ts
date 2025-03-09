import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Product from "@/models/product";

export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get("query") || "";

        if (!query.trim()) {
            return NextResponse.json({ suggestions: [] });
        }

        // Search for product names that start with or contain the query (case-insensitive)
        const suggestions = await Product.find(
            { product_name: { $regex: query, $options: "i" } }, // Case-insensitive search
        ).limit(7).select("product_name");

        return NextResponse.json({ suggestions });
    } catch (error) {
        console.error("Error fetching search suggestions:", error);
        return NextResponse.json({ error: "Failed to fetch search suggestions" }, { status: 500 });
    }
}
