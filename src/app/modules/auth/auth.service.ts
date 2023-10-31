import { User } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import { createToken } from "../../../helpers/jwtHelper";
import { ILoginResponse } from "./auth.interface";

const login = async (data: User):Promise<ILoginResponse> => {
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

    if(!isUserExists){
        throw new Error("User does not exists");
    }



    
    const Tokendata = {
        role: isUserExists.role,
        id: isUserExists.id,
    }


    const accessToken = createToken(Tokendata, "access_Token_secret", { expiresIn: '200d' });
    const refreshToken = createToken(Tokendata, "refreshToken_secret", { expiresIn: "365d" });



    return {
        accessToken,
        refreshToken
    };

}


export const AuthService = {
    login
}

