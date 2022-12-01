import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	email: { type: String, required: true },
	password: { type: String, required: true },
	cart: [
		{
			id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
			quantity: { type: Number, default: 1, min: 1 },
		},
	],
});

export default mongoose.model("User", userSchema);
