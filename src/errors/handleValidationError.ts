
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { IGenericErrorMessage, IGenericErrorResponse } from "./interface";
import { StatusCodes } from "http-status-codes";




type IValidation =
    { target: string[] }
const handleValidationError = (error: PrismaClientValidationError): IGenericErrorResponse => {
    let errors = [{
        path: "",
        message: error.message,
    }]

    if ('meta' in error) {

        const errorWithTargetFilds = error.meta as IValidation;
        errors = errorWithTargetFilds.target.map(field => {
            const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
            return {
                path: "",
                message: `${capitalizedField} is already exists!`
            }
        })
    }


    return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Validation Error',
        // message: message,
        errorMessages: errors
    }
}

export default handleValidationError;