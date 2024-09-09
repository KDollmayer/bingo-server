export interface CreateBoardItem {
  content: string;
}

export interface BoardItem {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  GameBoard: GameBoard[];
}

export interface CreateGameBoardItem {
  userId: string;
  boardItemId: string;
  position: number;
  checked: boolean;
}
export interface CreateGameBoardItem {
  userId: string;
  boardItemId: string;
  position: number;
  checked: boolean;
}
export interface UpdateGameBoard {
  id: string;
  checked: boolean;
}

export interface GameBoard {
  id?: string;
  user?: User;
  userId: string;
  content?: BoardItem;
  boardItemId: string;
  position: number;
  checked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Represents a User
export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  GameBoard: GameBoard[];
}
