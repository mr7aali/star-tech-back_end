import jwt, { JwtPayload, Secret } from "jsonwebtoken";


export const createToken = (
    payload: Object,
    secret: Secret,
    option: Object
): string => {
    return jwt.sign(payload, secret, option);
}


export const verifyToken = (token: string, secret: Secret) => {
    try {
        const verifiedToken = jwt.verify(token, secret) as JwtPayload;
        return verifiedToken;
    } catch (err) {
        throw new Error("Invalid token")
    }
}