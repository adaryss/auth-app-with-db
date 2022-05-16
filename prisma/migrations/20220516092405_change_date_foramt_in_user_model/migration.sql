/*
  Warnings:

  - You are about to alter the column `createdAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isAdminConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" INTEGER NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "isAdminConfirmed", "role", "uid") SELECT "createdAt", "email", "id", "isAdminConfirmed", "role", "uid" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
