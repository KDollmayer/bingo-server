import { Prisma } from "@prisma/client";
import { GameBoardJson } from "../types/gameBoardJson";

import { dbClient } from "../utils/prisma";
import {
  generateGameBoardJson,
  generateSingleGameBoardJson,
} from "../utils/generateGameBoardsJson";
import { createError } from "../middleware/errorMiddleware";

export async function createMultibleGameBoardJson(
  gameBoardDataJson: Prisma.GameBordJsonCreateManyInput[]
) {
  try {
    await dbClient.gameBordJson.createMany({
      data: gameBoardDataJson,
      skipDuplicates: true,
    });
  } catch (error: any) {
    throw createError(500, error.message || "failed to createGameBoard");
  }
}
export async function createSingleGameBoardJson(
  gameBoardDataJson: Prisma.GameBordJsonCreateManyInput
) {
  try {
    return await dbClient.gameBordJson.create({
      data: gameBoardDataJson,
    });
  } catch (error: any) {
    throw createError(500, error.message || "failed to createGameBoard");
  }
}
export async function getGameBoardJson(userId: string) {
  try {
    let gameBoard = await dbClient.gameBordJson.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!gameBoard) {
      return await generateSingleGameBoardJson(userId);
    }
    return gameBoard;
  } catch (error: any) {
    throw createError(500, error.message || "failed to getGameBoardJson");
  }
}

export async function updateGameBoardJson(
  gameBoardJson: Prisma.GameBordJsonCreateInput
) {
  try {
    return await dbClient.gameBordJson.update({
      where: {
        id: gameBoardJson.id,
      },
      data: {
        board: gameBoardJson.board,
      },
    });
  } catch (error: any) {
    throw createError(500, error.message || "failed to updateGameBoardJson");
  }
}

export async function deleteAllGameBoardJson() {
  try {
    return await dbClient.gameBordJson.deleteMany();
  } catch (error: any) {
    throw createError(500, error.message || "failed to deleteMany game boards");
  }
}
