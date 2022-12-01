import User from "../../models/User.js";

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		res.status(200).json({ success: true, result: user });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ success: false, message: err.message || "Somthing went wrong" });
	}
};

export default getUser;
