import { numTake } from "../data";
import { createError } from "../middleware/errorMiddleware";
import { BoardItem, CreateBoardItem } from "../types/boardItems";
import { dbClient } from "../utils/prisma";

export async function createBoardItem(content: CreateBoardItem[]) {
  try {
    await dbClient.boardItem.createMany({ data: content });
  } catch (error: any) {
    throw createError(500, error.message || "Failed to create board items.");
  }
}
export async function getAllBoardItems(): Promise<BoardItem[] | undefined> {
  try {
    return await dbClient.$queryRawUnsafe(
      `SELECT * FROM "BoardItem" ORDER BY RANDOM() LIMIT ${numTake};`
    );
  } catch (error: any) {
    throw createError(500, error.message || "Failed to get board items.");
  }
}
