import express from "express";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.post("/create", CategoryController.create)
router.get("/", CategoryController.getAll)
router.get("/:id", CategoryController.getSingle)
router.delete("/:id",CategoryController.deleteCategory)
router.patch("/:id",CategoryController.update)


export const CategoryRouter = router;