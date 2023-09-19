"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
const create = (images, featuresData, productData) => __awaiter(void 0, void 0, void 0, function* () {
    ///create product 
    const ProductCreateResult = yield exports.prisma.product.create({
        data: productData
    });
    const productId = ProductCreateResult.id;
    const imagesWithProductId = images.map((url) => (Object.assign(Object.assign({}, url), { productId })));
    const featuresWithProductId = featuresData.map((features) => (Object.assign(Object.assign({}, features), { productId })));
    ///! this login unble to create all data , some time they forget to push all data 🤣
    // const imageCreateResponse = imagesWithProductId.map(async (image) => await prisma.image.create({
    //     data: image
    // }));
    // const featureCreateResponse = featuresWithProductId.map(async (feature) => await prisma.feature.create({
    //     data: feature
    // }))
    //! for loop work well in this problem 
    for (let i = 0; i < Number(imagesWithProductId.length); i++) {
        yield exports.prisma.image.create({
            data: imagesWithProductId[i]
        });
    }
    for (let i = 0; i < Number(featuresWithProductId.length); i++) {
        yield exports.prisma.feature.create({
            data: featuresWithProductId[i]
        });
    }
    const result = yield exports.prisma.product.findUnique({
        where: {
            id: ProductCreateResult.id
        },
        include: {
            images: true, features: true
        }
    });
    return result;
});
const getAll = (paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(paginationOption.page) || 1;
    const limit = Number(paginationOption.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = paginationOption.sortBy || 'createdAt';
    const sortOrder = paginationOption.sortOrder || 'asc';
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const result = yield exports.prisma.product.findMany({
        take: limit, skip,
        orderBy: sortCondition,
        include: {
            features: true,
            images: true
        }
    });
    return result;
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exports.prisma.product.findUnique({
        where: {
            id
        }
    });
    return result;
});
exports.ProductService = {
    create, getAll, getSingle
};
