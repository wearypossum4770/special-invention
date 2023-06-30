-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idempotentId" TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "pageTitle" TEXT NOT NULL,
    "pageLocation" TEXT NOT NULL,
    "pagePath" TEXT NOT NULL,
    "pageReferrer" TEXT,
    "userAgent" TEXT NOT NULL,
    "pageEncoding" TEXT NOT NULL,
    "engagementTimeMsec" INTEGER NOT NULL
);
