import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { error } from 'console';
import { IGenericErrorResponse } from './interface';
import { StatusCodes } from 'http-status-codes';
const handleValidationError = (error: PrismaClientValidationError): IGenericErrorResponse => {
    const missignField = error.message.split('\n').find((line) => line.includes('Argument'));
    let errors = [{
        path: "",
        message: missignField || "",
    }];
    return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: error.name,
        errorMessages: errors
    }
}



export default handleValidationError;