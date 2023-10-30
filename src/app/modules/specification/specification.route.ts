import express from "express";
import { SpecificationController } from "./specification.controller";


const router = express.Router();



router.post('/create', SpecificationController.create);
// router.get('/', ProductController.getAll);
// router.get('/:id', ProductController.getSingle);





export const specificationRoutes = router;