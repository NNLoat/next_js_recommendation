import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Product from "@/models/product";

// export async function GET(req: NextRequest) {
//     try {
//         await connectToDB();
//         const products = await Product.find().select("_id product_id product_name price product_type image_thumb unit product_description_thai");

//         return NextResponse.json({ products });
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
//     }
// }
export async function GET(req: NextRequest) {
  try {
      await connectToDB();

      // Extract query parameters
      const { searchParams } = new URL(req.url);
      const idsParam = searchParams.get("ids");

      let products;

      if (idsParam) {
          // Convert comma-separated string to an array
          const productIds = idsParam.split(",");

          // Fetch only products with matching product_id
          products = await Product.find({ product_id: { $in: productIds } })
              .select("_id product_id product_name price product_type image_thumb unit product_description_thai");
      } else {
          // Fetch all products (default behavior)
          products = await Product.find()
              .select("_id product_id product_name price product_type image_thumb unit product_description_thai");
      }

      return NextResponse.json({ products });

  } catch (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}


// ✅ PATCH: Update Product
export async function PATCH(req: NextRequest) {
  try {
    await connectToDB();
    const { _id, product_name, price, unit, product_description_thai, image_thumb } = await req.json();


    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { product_name, price, unit, product_description_thai,image_thumb},
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectToDB();
        const { _id } = await req.json(); // Get the product ID from request body

        if (!_id) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        const deletedProduct = await Product.findByIdAndDelete(_id);

        if (!deletedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}

// ✅ POST: Add New Product
export async function POST(req: NextRequest) {
    try {
      await connectToDB();
      const { product_id, product_name, price, unit, image_thumb, product_type, product_description_thai } = await req.json();
  
      // Validation: Ensure required fields are present
      if (!product_id || !product_name || price == null || !unit || !image_thumb || !product_type || !product_description_thai) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }
  
      // Check if product_id already exists (optional)
      const existingProduct = await Product.findOne({ product_id });
      if (existingProduct) {
        return NextResponse.json({ error: "Product ID already exists" }, { status: 400 });
      }
  
      const newProduct = new Product({ product_id, product_name, price, unit, image_thumb, product_type, product_description_thai });
      await newProduct.save();
      // console.log(newProduct)
  
      return NextResponse.json({ message: "Product added successfully", product: newProduct }, { status: 201 });
    } catch (error) {
      console.error("Error adding product:", error);
      return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
    }
  }
