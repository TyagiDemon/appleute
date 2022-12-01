import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const regexExp =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

const register = async (req, res) => {
	try {
		// console.log(req.body);
		const { email, name, password, confirmPassword } = req.body;

		if (password != confirmPassword)
			throw { status: 400, message: "Passwords don't match" };

		if (!regexExp.test(email)) throw { status: 400, message: "Invalid email" };

		const existingUser = await User.findOne({ email });

		if (existingUser) throw { status: 400, message: "Account already exists" };

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await User.create({ name, email, password: hashedPassword });

		const token = jwt.sign({ id: user._id }, "random", {
			expiresIn: "3h",
		});

		res.status(201).json({ success: true, result: { user, token: token } });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong", success: false });
	}
};

export default register;
