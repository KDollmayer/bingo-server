import { Prisma } from "@prisma/client";
import {
  createMultibleGameBoardJson,
  createSingleGameBoardJson,
} from "../service/gameBoardJson";
import { getAllUser } from "../service/users";
import { generateGameBoardJsonData } from "./dataformatting";
import { createError } from "../middleware/errorMiddleware";

export async function generateGameBoardJson() {
  try {
    const users = await getAllUser();
    if (!users) {
      throw createError(
        500,
        "Failed to fetch users for generate game board data."
      );
    }
    const gameBoardData = await generateGameBoardJsonData(users);
    if (!gameBoardData) {
      throw createError(500, "Failed to generate game board data.");
    }
    await createMultibleGameBoardJson(gameBoardData);
  } catch (error: any) {
    throw createError(
      500,
      error.message ||
        "An unexpected error occurred while generating the game board."
    );
  }
}
export async function generateSingleGameBoardJson(userId: string) {
  try {
    const gameBoardData = await generateGameBoardJsonData([{ id: userId }]);
    if (!gameBoardData) {
      throw createError(500, "Failed to generate game board data.");
    }
    return await createSingleGameBoardJson(gameBoardData[0]);
  } catch (error: any) {
    throw createError(
      500,
      error.message ||
        "An unexpected error occurred while generating the game board."
    );
  }
}
