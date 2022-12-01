import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const login = async (req, res) => {
	try {
		// console.log(req.body);
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) throw { status: 404, message: "Account doesn't exists" };

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect)
			throw { status: 400, message: "Incorrect Password" };

		const token = jwt.sign({ id: user._id }, "random", {
			expiresIn: "3h",
		});

		res.status(200).json({ success: true, result: token });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong", success: false });
	}
};

export default login;
