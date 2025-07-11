import { CatagoryService } from "./category.service";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Category } from "@prisma/client";

const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await CatagoryService.create(data);

  sendResponse<Category>(res, {
    statusCode: 200,
    success: true,
    message: "Category created successfully!",
    data: result,
  });
});
const update = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.params;
  const result = await CatagoryService.update({ id, data });

  sendResponse<Category>(res, {
    statusCode: 200,
    success: true,
    message: "Category created successfully!",
    data: result,
  });
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await CatagoryService.getAll();

  sendResponse<Category[]>(res, {
    statusCode: 200,
    success: true,
    message: "Category gotten successfully!",
    data: result,
  });
});
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CatagoryService.getSingle(id);

  sendResponse<Category>(res, {
    statusCode: 200,
    success: true,
    message: "single category!",
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CatagoryService.deleteCategory(id);

  sendResponse<Category>(res, {
    statusCode: 200,
    success: true,
    message: "single category!",
    data: result,
  });
});

export const CategoryController = {
  create,
  update,
  getAll,
  getSingle,
  deleteCategory,
};
