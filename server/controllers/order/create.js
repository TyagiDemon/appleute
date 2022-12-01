import axios from "axios";
import Order from "../../models/Order.js";
import User from "../../models/User.js";

const create = async (req, res) => {
	try {
		const user = await User.findById(req.body.id).select("cart");
		const cart = user.cart;

		const order = await Order.create({ user: req.body.id });

		let list = [];
		let promises = [];

		const addItem = async (item) => {
			const data = await axios
				.get(`http://localhost:5000/product/${item.id}`)
				.then((response) => response.data);

			list.push({
				id: item.id,
				price: data.result.price,
				quantity: item.quantity,
			});
		};

		cart.map((item) => {
			promises.push(addItem(item));
		});

		await Promise.all(promises);

		order.list = list;
		await order.save();

		res.status(201).json({ success: true, result: order });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ success: false, message: err.message || "Something went wrong" });
	}
};

export default create;
