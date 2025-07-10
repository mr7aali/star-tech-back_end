import { User } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import bcrypt from "bcrypt";
import CustomError from "../../../errors/CustomError";

const create = async (data: User): Promise<User> => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
  } catch (error) {
    throw new CustomError(500, "Failed to hash password");
  }

  return await prisma.user.create({ data });
};
const profile = async (id: string): Promise<Partial<User> | null> => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};
const getAll = async (): Promise<User[]> => {
  return await prisma.user.findMany({});
};

export const UserService = {
  create,
  profile,
  getAll,
};
