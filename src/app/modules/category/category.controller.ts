import { CatagoryService } from './category.service';
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";

const create = catchAsync(
    async (req: Request, res: Response) => {
        const data = req.body;
        const result = await CatagoryService.create(data);

    }
);

export const CategoryController = {
    create
}