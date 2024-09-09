import cron from "node-cron";
import { generateGameBoardJson } from "./generateGameBoardsJson";
import { deleteAllGameBoardJson } from "../service/gameBoardJson";

export function scheduleGeneratingNewGameBoards() {
  console.log("Schedule generating new GameBoard for users");
  cron.schedule(
    "0 2 * * *",
    async () => {
      try {
        console.log("Cron job started at 02:00 UTC");
        await deleteAllGameBoardJson();
        await generateGameBoardJson();

        console.log("Game board generation completed successfully.");
      } catch (error: any) {
        console.error("Error during cron job:", error.message || error);
      }
    },
    {
      scheduled: true,
      timezone: "UTC",
    }
  );
}
