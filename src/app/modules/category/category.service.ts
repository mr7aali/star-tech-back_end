import { Category } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import CustomError from "../../../errors/CustomError";
import { StatusCodes } from "http-status-codes";

const create = async (data: Category): Promise<Category> => {
    const result = await prisma.category.create({ data });
    if (!result) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Category create failed!");
    }
    return result;
}
const update = async ({ id, data }: { id: string, data: Partial<Category>; }): Promise<Category> => {
    const result = await prisma.category.update({
        where: {
            id: Number(id)
        }, data
    });
    if (!result) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Category Update failed!");
    }
    return result;
}
const getAll = async (): Promise<Category[]> => {
    const result = await prisma.category.findMany({
    });
    if (!result) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Category not found!");
    }
    return result;
}
const getSingle = async (id: string): Promise<Category> => {
    const result = await prisma.category.findUnique({
        where: {
            id: Number(id)
        }
    })
    if (!result) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Category not found!");
    }
    return result;
}

export const CatagoryService = {
    create, update, getAll, getSingle
}