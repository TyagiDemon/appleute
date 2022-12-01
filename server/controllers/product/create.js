import Product from "../../models/Product.js";

const create = async (req, res) => {
	try {
		const { name, category, price } = req.body;
		const product = await Product.create({
			name,
			category,
			price,
		});

		res.status(201).json({ success: true, result: product });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ success: false, message: err.message || "Something went wrong" });
	}
};

export default create;
