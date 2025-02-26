import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb"; // Your MongoDB connection function
import Product from "@/models/product"; // Your Mongoose product model

export async function GET(req: NextRequest) {
    try {
      await connectToDB();
      
      const searchParams = new URL(req.url).searchParams;
      const query = searchParams.get("query");
  
      if (!query) {
        return NextResponse.json({ error: "Query is required" }, { status: 400 });
      }
      console.log(query)
      // console.log(await Product.findOne());
      // const collections = await Product.db.listCollections();
  // console.log("📂 Available Collections:", collections.map((c: { name: any; }) => c.name));
  
      const products = await Product.find({
        product_name: { $regex: query, $options: "i" }, // Case-insensitive search
      });
  
      return NextResponse.json(products);
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
  }