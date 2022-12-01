import express from "express";
import create from "../controllers/product/create.js";
import getProduct from "../controllers/product/getProduct.js";

const router = express.Router();

router.post("/create", create);
router.get("/:id", getProduct);

export default router;
