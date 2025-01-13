-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
