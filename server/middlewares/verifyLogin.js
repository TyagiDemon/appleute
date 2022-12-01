import jwt from "jsonwebtoken";

const verifyLogin = async (req, res, next) => {
	try {
		if (!req.headers.access_token)
			throw { status: 400, message: "Please login to continue!" };

		const data = jwt.verify(req.headers.access_token, "random");

		if (!data) {
			throw {
				status: 400,
				message: "Invalid login. Please login again to continue",
			};
		}

		req.body.id = data.id;
		next();
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong", success: false });
	}
};

export default verifyLogin;
