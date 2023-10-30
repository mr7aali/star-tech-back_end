import { Display, Processor, Product, Specification } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import { IProductCreatingData } from "./product.interface"


const create = async (data: IProductCreatingData): Promise<any | null> => {



    const productID = await prisma.$transaction(async (tx) => {
        //! product created
        const productResult = await tx.product.create({ data: data.Product })

        //! specification created
        const specificationResult = await tx.specification.create({
            data: { product_id: productResult.id }
        })

        const specifaicationId = Number(specificationResult.id)

        //! display created
        await tx.display.create({
            data: {
                ...data.Display, specification_id: specifaicationId
            }
        })
        //! processor created
        await tx.processor.create({
            data: {
                ...data.Processor, specification_id: specifaicationId
            }
        })


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
    console.log(result);
    return result




}

export const ProductService = {
    create
}