import { numTake } from "../data";
import { createError } from "../middleware/errorMiddleware";
import { getAllBoardItems } from "../service/boardItem";
import { BoardItem, GameBoard } from "../types/boardItems";
import { User } from "../types/users";
import { dbClient } from "./prisma";

function generateOrderNumberArray(x: number): number[] {
  return Array.from({ length: x + 1 }, (_, index) => index);
}

function shuffleOrderNumberArray<T>(numbers: T[]): T[] {
  let currentIndex = numbers.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [numbers[currentIndex], numbers[randomIndex]] = [
      numbers[randomIndex],
      numbers[currentIndex],
    ];
  }

  return numbers;
}

export async function generateGameBoardData(users: User[]) {
  const orderNumbers = generateOrderNumberArray(numTake - 1);
  const shuffleOrderNumbers = shuffleOrderNumberArray(orderNumbers);
  try {
    const boardItems = await getAllBoardItems();
    if (!boardItems) {
      throw createError(500, "failed to fetch boardItems");
    }
    const gameBoardData = users.flatMap((user) =>
      boardItems.map((item, index) => ({
        userId: user.id,
        boardItemId: item.id,
        position: shuffleOrderNumbers[index],
        checked: false,
      }))
    );

    return gameBoardData;
  } catch (error: any) {
    throw createError(500, error.message);
  }
}

export async function generateGameBoardJsonData(users: User[]) {
  const orderNumbers = generateOrderNumberArray(numTake - 1);
  try {
    const boardItems = await getAllBoardItems();
    if (!boardItems) {
      throw createError(500, "failed to fetch boardItems");
    }

    const gameBoardData = users.map((user) => {
      const shuffleOrderNumbers = shuffleOrderNumberArray(orderNumbers);
      return {
        userId: user.id,
        board: boardItems.map((item, index) => {
          return {
            boardItemId: item.id,
            boardItem: item.content,
            position: shuffleOrderNumbers[index],
            checked: false,
          };
        }),
      };
    });
    return gameBoardData;
  } catch (error: any) {
    throw createError(500, error.message || "failed to generate game board");
  }
}
