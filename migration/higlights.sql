CREATE TABLE "higlights" (
   "id" bigserial NOT NULL,
   "lid" VARCHAR NOT NULL UNIQUE,
   "kategori" VARCHAR NOT NULL,
   "deskripsi" TEXT NOT NULL,
   "alamat" VARCHAR NOT NULL,
   "pelapor" VARCHAR NOT NULL,
   "lokasi" VARCHAR NOT NULL,
   "catatan" VARCHAR ,
   "status" VARCHAR NOT NULL,
   "telp" VARCHAR NOT NULL,
   "tipe" VARCHAR NOT NULL,
   "agen" VARCHAR NOT NULL,
   "dinas" VARCHAR NOT NULL,
   "created_at" timestamptz NOT NULL DEFAULT (now()),
   "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "higlights" ("id");
CREATE INDEX ON "higlights" ("lid");

