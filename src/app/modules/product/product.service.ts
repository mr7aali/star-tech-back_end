import { specificationRoutes } from './../specification/specification.route';
import { Product } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import { IProductCreatingData, ISpecificationData, ITableName, IncludeAllSpecification, } from "./product.interface"
import CustomError from "../../../errors/CustomError"
import { StatusCodes } from "http-status-codes"
import { NextFunction } from "express"
import { type } from 'os';
import { table } from 'console';


const create = async ({ product, spacificationData, next }: { product: Product, spacificationData: IProductCreatingData, next: NextFunction }): Promise<any | null> => {



    const productID = await prisma.$transaction(async (tx) => {

        //! product created
        const productResult = await tx.product.create({ data: product })

        //! specification created
        const specificationResult = await tx.specification.create({
            data: { product_id: productResult.id }
        })
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

        }

        return productResult.id;
    }, { timeout: 1000000 })
    const result = await prisma.product.findUnique({
        where: {
            id: productID
        },
        include: {
            Specification: {
                include: {
                    display: true,
                    product: true,
                    processor: true

                }
            }
        }
    })

    return result
}

const getAll = async () => {
    const page = 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const result = await prisma.product.findMany({
        skip,
        take: limit
    });


    if (!result.length) {
        throw new CustomError(StatusCodes.NOT_FOUND, "Product not found!")
    }

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