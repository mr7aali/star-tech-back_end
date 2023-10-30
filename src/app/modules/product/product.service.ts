import { Display, Processor, Product, Specification } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import { IProductCreatingData } from "./product.interface"


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
                    Display: true,
                    product: true,
                    Processor: true

                }
            }
        }
    })

    return result
}

export const ProductService = {
    create
}