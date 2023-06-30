-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PageView" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idempotentId" TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "pageTitle" TEXT NOT NULL,
    "pageLocation" TEXT NOT NULL,
    "pagePath" TEXT NOT NULL,
    "pageReferrer" TEXT,
    "userAgent" TEXT NOT NULL,
    "pageEncoding" TEXT NOT NULL,
    "engagementTimeMsec" INTEGER NOT NULL,
    CONSTRAINT "PageView_anonymousId_fkey" FOREIGN KEY ("anonymousId") REFERENCES "AnonymousUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PageView" ("anonymousId", "engagementTimeMsec", "id", "idempotentId", "pageEncoding", "pageLocation", "pagePath", "pageReferrer", "pageTitle", "userAgent") SELECT "anonymousId", "engagementTimeMsec", "id", "idempotentId", "pageEncoding", "pageLocation", "pagePath", "pageReferrer", "pageTitle", "userAgent" FROM "PageView";
DROP TABLE "PageView";
ALTER TABLE "new_PageView" RENAME TO "PageView";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
