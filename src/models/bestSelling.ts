import mongoose from "mongoose";

const BestSellingAllProductSchema = new mongoose.Schema({
  product_id: {type:String, required: true},
  rank: {type: Number, required:true}
});

export default mongoose.models.BestSellingAllProduct || mongoose.model("BestSellingAllProduct", BestSellingAllProductSchema);
