import { createError } from "../middleware/errorMiddleware";
import { User } from "../types/users";
import { dbClient } from "../utils/prisma";

export async function createManyUsers(content: User[]) {
  try {
    await dbClient.user.createMany({ data: content });
  } catch (error: any) {
    throw createError(500, error.message || "failed to create many users");
  }
}
export async function createUser(userId: string) {
  try {
    return await dbClient.user.create({
      data: { id: userId },
    });
  } catch (error: any) {
    throw createError(500, error.message || "failed to create user");
  }
}

export async function getAllUser() {
  try {
    return await dbClient.user.findMany({ select: { id: true } });
  } catch (error: any) {
    throw createError(500, error.message || "failed to get all users");
  }
}

export async function findUser(userId: string) {
  try {
    return await dbClient.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error: any) {
    throw createError(500, error.message || "failed to get user");
  }
}
