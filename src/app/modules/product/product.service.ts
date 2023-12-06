import { prisma } from './../../../shared/prisma';
import { Display, Processor, Product, Specification } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import { IProductCreatingData } from "./product.interface"
import CustomError from "../../../errors/CustomError"
import { StatusCodes } from "http-status-codes"


const create = async ({ product, spacificationData }: { product: Product, spacificationData: IProductCreatingData }): Promise<any | null> => {



    const productID = await prisma.$transaction(async (tx) => {

        //! product created
        const productResult = await tx.product.create({ data: product })

        //! specification created
        const specificationResult = await tx.specification.create({
            data: { product_id: productResult.id }
        })
        const specification_id = Number(specificationResult.id)



        for (const [tableName, recordData] of Object.entries(spacificationData)) {
            const recordDataWithForeignKey = { ...recordData, specification_id }
            await (tx as any)[tableName].create({
                data: recordDataWithForeignKey
            });
        }
        return productResult.id;
    })
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
    const result = await prisma.product.findMany({});


    if (!result.length) {
        throw new CustomError(StatusCodes.NOT_FOUND, "Product not found!")
    }

    return result;
}
const getSingle = async (id: string) => {
    // const result = await prisma.product.findUnique({
    //     where: {
    //         id: Number(id)
    //     },
    //     include: {
    //         Specification: {
    //             include: {
    //                 Display: true,
    //                 Processor: true,
    //                 product: true
    //             }
    //         }


    //     }
    // });
    const result = await prisma.specification.findUnique({
        where: {
            product_id: Number(id)
        },
        include: {
            product: true,
            display: true,
            processor: true,
            Audio: true,
            Camera: true,
            Connectivity: true,
            FrontCamera: true,
            Graphics: true,
            Keyboard: true,
            Memory: true,
            NetworkConnectivity: true,
            Os: true,
            PhysicalSpecification: true,
            PortsSlots: true,
            Power: true,
            RearCamera: true,
            Security: true,
            Storage: true

        }
    });


    for (const key in result) {
        if ((result as any)[key] === null || (result as any)[key] === undefined) {
            delete (result as any)[key]
        }


    }


    return result;
}
export const ProductService = {
    create, getAll, getSingle
}