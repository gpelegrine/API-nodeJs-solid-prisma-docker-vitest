/*
  Warnings:

  - You are about to drop the column `createdAt` on the `checkIns` table. All the data in the column will be lost.
  - You are about to drop the column `gymId` on the `checkIns` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `checkIns` table. All the data in the column will be lost.
  - You are about to drop the column `validatedAt` on the `checkIns` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `users` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `checkIns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gym_id` to the `checkIns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `checkIns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validated_at` to the `checkIns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "checkIns" DROP CONSTRAINT "checkIns_gymId_fkey";

-- DropForeignKey
ALTER TABLE "checkIns" DROP CONSTRAINT "checkIns_userId_fkey";

-- AlterTable
ALTER TABLE "checkIns" DROP COLUMN "createdAt",
DROP COLUMN "gymId",
DROP COLUMN "userId",
DROP COLUMN "validatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gym_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD COLUMN     "validated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "passwordHash",
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "checkIns" ADD CONSTRAINT "checkIns_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkIns" ADD CONSTRAINT "checkIns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
