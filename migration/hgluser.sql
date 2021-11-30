CREATE TABLE "hglusers" (
   "id" bigserial NOT NULL,
   "kategori" VARCHAR NOT NULL,
   "lokasi" TEXT NOT NULL,
   "deskripsi" TEXT NOT NULL,
   "created_at" timestamptz NOT NULL DEFAULT (now()),
   "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "hglusers" ("id");
