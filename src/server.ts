import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { getGameBoardJson, updateGameBoardJson } from "./service/gameBoardJson";
import authMiddleware from "./middleware/authMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { scheduleGeneratingNewGameBoards } from "./utils/cronJob";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(authMiddleware);
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getGameBoardJson(req.user?.id);
    res.send(data);
  } catch (error) {
    next(error);
  }
});
app.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateGameBoardJson(req.body);
    res.send(data);
  } catch (error) {
    next(error);
  }
});
app.use(errorMiddleware);
app.listen(port, async () => {
  scheduleGeneratingNewGameBoards();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
