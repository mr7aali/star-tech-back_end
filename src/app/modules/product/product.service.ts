import { Product } from "@prisma/client"
import { prisma } from "../../../shared/prisma"

const create = (data: Product) => {
    const result = prisma.product.create({ data });
    return result;
}


export const ProductService = {
    create
}