CREATE TABLE "laporans" (
   "id" bigserial NOT NULL,
   "kategori" VARCHAR NOT NULL,
   "deskripsi" TEXT NOT NULL,
   "lokasi" TEXT NOT NULL,
   "alamat" VARCHAR NOT NULL,
   "status" VARCHAR NOT NULL,
   "created_at" timestamptz NOT NULL DEFAULT (now()),
   "updated_at" timestamptz NOT NULL DEFAULT (now())
)

CREATE INDEX ON "laporans" ("id");
CREATE INDEX ON "laporans" ("kategori");
CREATE INDEX ON "laporans" ("status");

