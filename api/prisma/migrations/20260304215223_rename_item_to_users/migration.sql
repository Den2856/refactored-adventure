ALTER TABLE "Item" RENAME TO "users";

-- необязательно, но красиво: переименовать pk/sequence (если существуют)
ALTER TABLE "users" RENAME CONSTRAINT "Item_pkey" TO "users_pkey";
ALTER SEQUENCE IF EXISTS "Item_id_seq" RENAME TO "users_id_seq";