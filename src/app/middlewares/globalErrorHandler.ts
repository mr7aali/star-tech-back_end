import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { IGenericErrorMessage } from "../../errors/interface";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import PrismaClientError from "../../errors/PrismaClientKnownRequestError";
import handleValidationError from "../../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (
    error,
    req,
    res,
    nex,
) => {

    let statusCode = 400;
    let message = 'Something went wrong !';
    let errorMessages: IGenericErrorMessage[] = []


    if (error instanceof PrismaClientKnownRequestError) {
        const simplifiedError = PrismaClientError(error);

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof PrismaClientValidationError) {
        const simplifiedError = handleValidationError(error);
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages

    }


    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: error.stack
    });
}

export default globalErrorHandler;