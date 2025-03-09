import mongoose from "mongoose";

const BestSellingMetalSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  rank: { type: Number, required: true }
});

export default mongoose.models.BestSellingMetal ||
  mongoose.model("BestSellingMetal", BestSellingMetalSchema, "bestsellingmetals");