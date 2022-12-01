import User from "../../models/User.js";

const addToCart = async (req, res) => {
	try {
		const { product_id, quantity } = req.body;
		const user = await User.findById(req.body.id).select("cart");

		if (!user) throw { status: 404, message: "Account not found" };

		let itemKey = null,
			inCart = false;

		user.cart.map((item, key) => {
			if (item.id == product_id) {
				if (quantity === 0) itemKey = key;
				else item.quantity = quantity;

				inCart = true;
			}
		});

		if (!inCart) user.cart.push({ id: product_id, quantity });
		else user.cart.splice(itemKey, 1);

		await user.save();

		res.status(200).json({ success: true, result: user });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ success: false, message: err.message || "Something went wrong" });
	}
};

export default addToCart;
