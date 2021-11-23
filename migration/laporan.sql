CREATE TABLE "laporans" (
  "id" bigserial NOT NULL,
   "kategori" VARCHAR NOT NULL,
   "deskripsi" TEXT NOT NULL,
   "alamat" VARCHAR NOT NULL,
   "pelapor" VARCHAR,
   "lokasi" VARCHAR,
   "catatan" VARCHAR,
   "status" VARCHAR,
   "telp" VARCHAR,
   "tipe" VARCHAR,
   "agen" VARCHAR,
   "dinas" VARCHAR ,
   "created_at" timestamptz NOT NULL DEFAULT (now()),
   "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "laporans" ("id");
CREATE INDEX ON "laporans" ("kategori");
CREATE INDEX ON "laporans" ("status");

