
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProductService } from './product.service';

const create = catchAsync(
    async (req: Request, res: Response) => {



        const { product, ...spacificationData } = req.body;
        const result = await ProductService.create({ product, spacificationData });




        sendResponse<any>(res, {
            statusCode: 200,
            success: true,
            message: "Product created successfully!",
            data: result
        })



    }
);

export const ProductController = {
    create,
}