import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes"
import { AuthService } from "./auth.service";
import CustomError from "../../../errors/CustomError";



const login = catchAsync(
    async (req: Request, res: Response) => {
        const data = req.body;

        const result = await AuthService.login(data);



        //set refresh token into cookie
        const cookieOption = {
            secure: true,  // production ? true : false
            httpOnly: true
        };
        res.cookie("refreshToken", result.refreshToken, cookieOption);


        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "login successfully",
            data: {
                accessToken: result.accessToken
            }
        });
    }
)
const refreshToken = catchAsync(
    async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new CustomError(StatusCodes.FORBIDDEN, "Refresh Token not found!")
        }
        const result = await AuthService.refreshToken(refreshToken);

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "refreshToken created successfully",
            data: {
                accessToken: result.accessToken
            }
        });
    }
)
export const AuthController = {
    login, refreshToken
}