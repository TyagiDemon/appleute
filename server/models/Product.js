import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
	name: { type: String, required: true },
	category: { type: String, required: true },
	price: { type: Number, min: 0 },
});

export default mongoose.model("Product", productSchema);
