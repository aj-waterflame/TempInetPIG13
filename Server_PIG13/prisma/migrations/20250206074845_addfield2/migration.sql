/*
  Warnings:

  - You are about to alter the column `rc1` on the `rtdata` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `rtdata` ADD COLUMN `rc102` VARCHAR(6) NULL,
    MODIFY `rc1` DATETIME NOT NULL;
