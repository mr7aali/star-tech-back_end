import { Product } from '@prisma/client';
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProductService } from "./product.service";
import pick from '../../../shared/pick';

const create = catchAsync(
    async (req: Request, res: Response) => {
        const data = req.body;
        const { images, features, ...productData } = req.body;
        const result = await ProductService.create(images, features, productData);

        sendResponse<Product>(res, {
            statusCode: 200,
            success: true,
            message: "Product created successfully",
            data: result
        })
    }
);

const getAll = catchAsync(
    async (req: Request, res: Response) => {


        const paginationOption = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);//paginationFields

        const result = await ProductService.getAll(paginationOption);

        sendResponse<Product[]>(res, {
            statusCode: 200,
            success: true,
            message: "Product created successfully",
            data: result
        })
    }
);
const getSingle = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await ProductService.getSingle(id as string);

        sendResponse<Product | null>(res, {
            statusCode: 200,
            success: true,
            message: "get single product successfully",
            data: result
        })
    }
);

export const ProductController = {
    getAll, create, getSingle
}