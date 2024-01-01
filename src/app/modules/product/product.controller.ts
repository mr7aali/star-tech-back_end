
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProductService } from './product.service';
import { StatusCodes } from "http-status-codes";

const create = catchAsync(
    async (req: Request, res: Response,next:NextFunction) => {
        const { product, ...spacificationData } = req.body;
        const result = await ProductService.create({ product, spacificationData ,next});

        sendResponse<any>(res, {
            statusCode: 200,
            success: true,
            message: "Product created successfully!",
            data: result
        })



    }
);
const getAll = catchAsync(
    async (req: Request, res: Response) => {
        const result = await ProductService.getAll();

        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: "Product get successfully!",
            data: result
        })
    }
)
const getSingle = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await ProductService.getSingle(id);

        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: "Product get successfully!",
            data: result
        })
    }
)
export const ProductController = {
    create, getAll, getSingle
}