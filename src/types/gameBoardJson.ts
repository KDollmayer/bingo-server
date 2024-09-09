import { User } from "./users";
import { Prisma } from "@prisma/client";

export interface GameBoardJson {
  id?: string;
  user?: User;
  board: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
