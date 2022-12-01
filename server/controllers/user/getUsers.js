import User from "../../models/User.js";

const getUsers = async (req, res) => {
	try {
		const users = await User.find().select("name email");

		res.status(200).json({ success: true, result: users });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ success: false, message: err.message || "Somthing went wrong" });
	}
};

export default getUsers;
