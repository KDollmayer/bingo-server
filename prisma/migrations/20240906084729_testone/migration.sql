/*
  Warnings:

  - You are about to drop the `board` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "board" DROP CONSTRAINT "board_userId_fkey";

-- DropTable
DROP TABLE "board";

-- DropTable
DROP TABLE "content";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "BoardItem" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoardItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameBoard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "boardItemId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "GameBoard" ADD CONSTRAINT "GameBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameBoard" ADD CONSTRAINT "GameBoard_boardItemId_fkey" FOREIGN KEY ("boardItemId") REFERENCES "BoardItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
