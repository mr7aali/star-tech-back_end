import { Product, Image, Feature } from "@prisma/client"
import { PrismaClient } from "@prisma/client";
import { Sign } from "crypto";

export const prisma = new PrismaClient();

export type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';

};



const create = async (images: Image[], featuresData: Feature[], productData: Product): Promise<Product | null> => {


    ///create product 
    const ProductCreateResult = await prisma.product.create({
        data: productData

    });

    const productId = ProductCreateResult.id;

    const imagesWithProductId = images.map((url) => ({
        ...url, productId
    }));
    const featuresWithProductId = featuresData.map((features) => ({
        ...features, productId
    }));


    ///! this login unble to create all data , some time they forget to push all data 🤣
    // const imageCreateResponse = imagesWithProductId.map(async (image) => await prisma.image.create({
    //     data: image
    // }));

    // const featureCreateResponse = featuresWithProductId.map(async (feature) => await prisma.feature.create({
    //     data: feature
    // }))


    //! for loop work well in this problem 
    for (let i = 0; i < Number(imagesWithProductId.length); i++) {
        await prisma.image.create({
            data: imagesWithProductId[i]
        })
    }

    for (let i = 0; i < Number(featuresWithProductId.length); i++) {
        await prisma.feature.create({
            data: featuresWithProductId[i]
        })
    }

    const result = await prisma.product.findUnique({
        where: {
            id: ProductCreateResult.id
        },
        include: {
            images: true, features: true
        }
    })
    return result;
}


const getAll = async (paginationOption: IPaginationOptions): Promise<Product[]> => {

    const page = Number(paginationOption.page) || 1;
    const limit = Number(paginationOption.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = paginationOption.sortBy || 'createdAt';
    const sortOrder = paginationOption.sortOrder || 'asc';


    const sortCondition: { [key: string]: string } = {};

    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder
    }

    const result = await prisma.product.findMany({
        take: limit, skip,
        orderBy: sortCondition,
        include: {
            features: true,
            images: true
        }
    })
    return result;

}

const getSingle = async (id: string): Promise<Product | null> => {
    const result = await prisma.product.findUnique({
        where: {
            id
        }
    })

    return result;
};


export const ProductService = {
    create, getAll, getSingle
}