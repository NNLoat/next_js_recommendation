import mongoose from "mongoose";

const BestSellingPipeSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  rank: { type: Number, required: true }
});

export default mongoose.models.BestSellingPipe ||
  mongoose.model("BestSellingPipe", BestSellingPipeSchema, "bestsellingpipes");