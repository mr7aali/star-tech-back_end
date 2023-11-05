import { verifyToken } from './../../../helpers/jwtHelper';
import { User } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import { createToken } from "../../../helpers/jwtHelper";
import { ILoginResponse } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomError from '../../../errors/CustomError';
import { StatusCodes } from 'http-status-codes';
const login = async (data: User): Promise<ILoginResponse> => {
    const isUserExists = await prisma.user.findUnique({
        where: {
            email: data.email,
            passwoard: data.passwoard
        },
        select: {
            id: true,
            role: true
        }
    });

    if (!isUserExists) {
        throw new CustomError(StatusCodes.NOT_FOUND, "User does not exists");
    }




    const Tokendata = {
        role: isUserExists.role,
        id: isUserExists.id,
    }


    const accessToken = createToken(Tokendata, "access_Token_secret", { expiresIn: '10d' });
    const refreshToken = createToken(Tokendata, "refreshToken_secret", { expiresIn: "365d" });



    return {
        accessToken,
        refreshToken
    };

}
const refreshToken = async (token: string): Promise<ILoginResponse> => {
    const decodedUserInfo = jwt.verify(token, 'refreshToken_secret') as JwtPayload;

    if (decodedUserInfo && 'id' in decodedUserInfo) {
        const isUserExists = await prisma.user.findUnique({
            where: {
                id: decodedUserInfo.id
            }
        })
        if (!isUserExists) {
            throw new Error("User does not exist");
        }
    }


    const tokenData = {
        role: decodedUserInfo.role,
        id: decodedUserInfo.id
    }

    const accessToken = createToken(tokenData, "access_Token_secret", { expiresIn: '10d' });
    return {
        accessToken
    }
}

export const AuthService = {
    login, refreshToken
}

