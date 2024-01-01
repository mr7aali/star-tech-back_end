
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { IGenericErrorMessage, IGenericErrorResponse } from "./interface";
import { StatusCodes } from "http-status-codes";





type IValidation =
    { target: string[] }
const PrismaClientError = (error: PrismaClientKnownRequestError): IGenericErrorResponse => {
    let errors = [{
        path: error.code,
        message: error.message,
    }]

    const errorWithTargetFilds = error.meta as IValidation;
    errors = errorWithTargetFilds?.target?.map(field => {
        const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
        return {
            path: "",
            message: `${capitalizedField} is already exists!`
        }
    })
    
    return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: error.meta?.error as string  ||  'Validation Error',
        errorMessages: errors
    }
}

export default PrismaClientError;