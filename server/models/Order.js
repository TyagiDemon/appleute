import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		list: [
			{
				id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
				price: { type: Number, min: 0 },
				quantity: { type: Number, default: 1, min: 1 },
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model("Order", orderSchema);
