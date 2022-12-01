import Product from "../../models/Product.js";

const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find();

		res.status(200).json({ success: true, result: products });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ success: false, message: err.message || "Something went wrong" });
	}
};

export default getAllProducts;
