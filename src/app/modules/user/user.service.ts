import { User } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const create = async (data: User): Promise<User> => {
    const result = await prisma.user.create({ data });

    return result;
}
const profile = async (id: string): Promise< Partial<User> | null> => {

    const result = await prisma.user.findUnique({
        where: {
            id
        },
    select:{
        id:true,
        first_name:true,
        last_name:true,
        email:true,
        phone:true,
    }

    });

    return result;
}
const getAll = async (): Promise<User[]> => {

    const result = await prisma.user.findMany({});

    return result;
}

export const UserService = {
    create, profile, getAll
}