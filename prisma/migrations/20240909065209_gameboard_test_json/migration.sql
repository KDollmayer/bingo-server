-- CreateTable
CREATE TABLE "GameBordJson" (
    "id" TEXT NOT NULL,
    "board" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GameBordJson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameBordJson" ADD CONSTRAINT "GameBordJson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
