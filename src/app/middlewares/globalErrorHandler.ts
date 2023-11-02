import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { IGenericErrorMessage } from "../../errors/interface";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import handleValidationError from "../../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (
    error,
    req,
    res,
    nex,
) => {
    console.log("Global error handler ");
    let statusCode = 400;
    let message = 'Something went wrong !';
    let errorMessages: IGenericErrorMessage[] = []


    if (error instanceof PrismaClientKnownRequestError) {
        const simplifiedError = handleValidationError(error);

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }

    
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: error.stack
    });
}

export default globalErrorHandler;