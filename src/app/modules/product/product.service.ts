import { Product } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import {
  IProductCreatingData,
  ISpecificationData,
  ITableName,
  IncludeAllSpecification,
} from "./product.interface";
import CustomError from "../../../errors/CustomError";
import { StatusCodes } from "http-status-codes";
import { NextFunction } from "express";

// const create = async ({
//   product,
//   spacificationData,
//   next,
// }: {
//   product: Product;
//   spacificationData: IProductCreatingData;
//   next: NextFunction;
// }): Promise<any | null> => {
//   const result = await prisma.$transaction(
//     async (tx) => {
//       const productResult = await tx.product.create({ data: product });
//       const specificationResult = await tx.specification.create({
//         data: { product_id: productResult.id },
//       });

//       const specification_id = Number(specificationResult.id);
//       for (const [tableName, recordData] of Object?.entries(
//         spacificationData
//       )) {
//         const recordDataWithForeignKey = { ...recordData, specification_id };
//         try {
//           await (tx as any)[tableName].create({
//             data: recordDataWithForeignKey,
//           });
//         } catch (err) {
//           next(err);
//         }
//       }

//       return productResult;
//     },
//     { timeout: 1000000 }
//   );
//   return result;
// };

const create = async ({
  productData,
  specification,
  next,
}: {
  productData: Product;
  specification: IProductCreatingData;
  next: NextFunction;
}): Promise<any | null> => {
  try {
    // sourcery skip: inline-immediately-returned-variable
    const result = await prisma.$transaction(
      async (tx) => {
        // Step 1: Create the product
        const product = await tx.product.create({
          data: productData,
        });

        // Step 2: Create the specification JSON
        const specData = {
          product_id: product.id,
          ...specification,
        };

        await tx.specification.create({
          data: specData,
        }); // type: string or number based on your schema

        return product;
      },

      {
        timeout: 1000000,
      }
    );
    return result;
  } catch (err) {
    next(err);
    return null;
  }
};

const getAll = async () => {
  const page = 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  return await prisma.product.findMany({
    skip,
    take: limit,
  });
};

const getSingle = async (id: string) => {
  const result = await prisma.product.findUnique({
    where: { id },
    include: {
      Specification: true,
    },
  });

  if (!result) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Product not found!");
  }

  const specification = result.Specification;

  if (specification) {
    // Remove null or non-object fields from the Specification
    for (const key in specification) {
      const value = specification[key as keyof typeof specification];
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        delete specification[key as keyof typeof specification];
      }
    }
  }

  return result;
};
const updateProduct = async ({
  id,
  productData,
}: {
  id: string;
  productData: Product;
}) => {
  return await prisma.product.update({
    where: { id },
    data: productData,
  });
};

export const ProductService = {
  create,
  getAll,
  getSingle,
  updateProduct,
};
