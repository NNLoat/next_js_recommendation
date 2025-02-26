import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: {type:String, required: true, alias: "product_id"},
  name: { type: String, required: true, alias: "product_name" },
  price: { type: Number, required: true},
  image: { type: String, required: true, alias: "image_thumb" },
  product_type: { type: String, required: true},
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
