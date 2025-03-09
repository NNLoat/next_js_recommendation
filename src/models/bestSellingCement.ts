import mongoose from "mongoose";

const BestSellingCementSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  rank: { type: Number, required: true }
});

export default mongoose.models.BestSellingCement ||
  mongoose.model("BestSellingCement", BestSellingCementSchema, "bestsellingcements");