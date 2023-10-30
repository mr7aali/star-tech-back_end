import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse";
import { Specification } from "@prisma/client";
import { SpecificationService } from "./specification.service";

const create = catchAsync(
    async (req: Request, res: Response) => {
        const data = req.body;
        const product_id = data.product_id
        const displayData = data.Display;
        const processorData = data.Processor

  
        const result = await SpecificationService.create({product_id, displayData, processorData });

        sendResponse<Specification | null>(res, {
            statusCode: 200,
            success: true,
            message: "Product created successfully!",
            data: result
        })
    }
)

export const SpecificationController = {
    create,
}