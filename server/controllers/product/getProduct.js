import Product from "../../models/Product.js";

const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) throw { status: 404, message: "Product not found" };

		res.status(200).json({ success: true, result: product });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ success: false, message: err.message || "Something went wrong" });
	}
};

export default getProduct;
