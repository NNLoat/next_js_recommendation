import mongoose from "mongoose";

const BestSellingConcreteSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  rank: { type: Number, required: true }
});

export default mongoose.models.BestSellingConcrete ||
  mongoose.model("BestSellingConcrete", BestSellingConcreteSchema, "bestsellingconcretes");