import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes"
import { UserService } from "./user.service";

const create = catchAsync(
    async (req: Request, res: Response) => {
        const data = req.body;
        const result = await UserService.create(data);

        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: "User created successfully",
            data: result,
        })
    })


export const UserController = {
    create
}