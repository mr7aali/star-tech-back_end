import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { UserService } from "./user.service";
import { User } from "@prisma/client";

const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UserService.create(data);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User created successfully",
    data: result,
  });
});
const profile = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.profile(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Profile information get successfully",
    data: result,
  });
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAll();

  sendResponse<User[]>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User get successfully",
    data: result,
  });
});

export const UserController = {
  create,
  profile,
  getAll,
};
