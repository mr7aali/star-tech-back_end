import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post("/create", ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getSingle);
router.patch("/update-product/:id", ProductController.updateProduct);

export const ProductRoutes = router;
