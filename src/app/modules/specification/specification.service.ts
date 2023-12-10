
import { Display, Processor, Specification } from '@prisma/client';
import { prisma } from '../../../shared/prisma';



const create = async (
    { product_id, displayData, processorData }
        :
        { product_id: string, displayData: Display, processorData: Processor }
): Promise<Specification | null> => {



    const specificationID = await prisma.$transaction(async (tx) => {

        //! specification created
        const specificationResult = await tx.specification.create({
            data: {
                product_id: Number(product_id)
            }
        })
        if (!specificationResult) {
            throw new Error("Specification create failed")
        }
        const specifaicationId = Number(specificationResult.id)

        //! display created
        await tx.display.create({
            data: {
                ...displayData, specification_id: specifaicationId
            }
        })
        //! processor created
        await tx.processor.create({
            data: {
                ...processorData, specification_id: specifaicationId
            }
        })


        return specifaicationId

    })


    const result = await prisma.specification.findUnique({
        where: {
            id: specificationID
        },
        include: {
            
        }
    })
    console.log(result);
    return result




}

export const SpecificationService = {
    create
}