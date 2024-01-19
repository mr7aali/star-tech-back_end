import express from "express";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.post("/create", CategoryController.create)

export const CategoryRouter = router;