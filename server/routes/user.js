import express from "express";
import addToCart from "../controllers/user/addToCart.js";
import getUser from "../controllers/user/getUser.js";
import getUsers from "../controllers/user/getUsers.js";
import login from "../controllers/user/login.js";
import register from "../controllers/user/register.js";
import verifyLogin from "../middlewares/verifyLogin.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/addToCart", verifyLogin, addToCart);
router.get("/getAll", getUsers);
router.post("/", verifyLogin, getUser);

export default router;
