-- CreateTable
CREATE TABLE "DesignSetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "heroBackgroundImage" TEXT,
    "projectsBackgroundImage" TEXT,
    "heroBackgroundEnabled" BOOLEAN NOT NULL DEFAULT false,
    "projectsBackgroundEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
