
import { Product } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import { IProductCreatingData, ISpecificationData, ITableName, IncludeAllSpecification, } from "./product.interface"
import CustomError from "../../../errors/CustomError"
import { StatusCodes } from "http-status-codes"
import { NextFunction } from "express"




const create = async ({ product, spacificationData, next }: { product: Product, spacificationData: IProductCreatingData, next: NextFunction }): Promise<any | null> => {

    const result = await prisma.$transaction(async (tx) => {
        const productResult = await tx.product.create({ data: product })
        const specificationResult = await tx.specification.create({
            data: { product_id: productResult.id }
        });

        const specification_id = Number(specificationResult.id)
        for (const [tableName, recordData] of Object?.entries(spacificationData)) {
            const recordDataWithForeignKey = { ...recordData, specification_id }
            try {
                await (tx as any)[tableName].create({
                    data: recordDataWithForeignKey
                });
            } catch (err) {
                next(err)
            }
        };

        return productResult;
    }, { timeout: 1000000 })
    return result;
}

const getAll = async () => {
    const page = 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const result = await prisma.product.findMany({
        skip,
        take: limit
    });

    return result;
}
const getSingle = async (id: string) => {
    const result = await prisma.product.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            Specification: IncludeAllSpecification,

        },


    });
    if (!result) {
        throw new CustomError(StatusCodes.NOT_FOUND, "Product not found!")
    }

    if (result && result.Specification) {
        for (const key in result.Specification) {

            if (typeof (result?.Specification as any)[key] !== "object" || (result.Specification as any)[key] === null) {
                delete (result?.Specification as any)[key]
            }
        }
    }

    return result
}


const updateProduct = async ({ id, data }: { id: number, data: ISpecificationData }) => {



    const result = await prisma.$transaction(async (tx) => {
        for (const [tableName, recordData] of Object?.entries(data)) {

            const r = await (prisma as any)[tableName].update({
                where: {
                    id: recordData.id
                },
                data: data[tableName as ITableName]
            });

        }
    }, { timeout: 1000000 })


    return result;
}


export const ProductService = {
    create, getAll, getSingle, updateProduct
}