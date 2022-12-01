import express from "express";
import create from "../controllers/order/create.js";
import verifyLogin from "../middlewares/verifyLogin.js";

const router = express.Router();

router.post("/create", verifyLogin, create);

export default router;
