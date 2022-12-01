import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/ping", (req, res) => {
	res.send("Ping pong");
});

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => {
		console.log(`Server running on ${PORT}`);
	});
});
