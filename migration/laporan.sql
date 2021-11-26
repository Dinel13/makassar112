CREATE TABLE "laporans" (
  "id" bigserial NOT NULL,
  "id_laporan" VARCHAR NOT NULL,
  "kategori" VARCHAR NOT NULL,
  "deskripsi" TEXT NOT NULL,
  "lokasi" VARCHAR,
  "kecamatan" VARCHAR,
  "kelurahan" VARCHAR,
  "catatan" VARCHAR,
  "status" VARCHAR,
  "pelapor" VARCHAR,
  "telp" VARCHAR,
  "channel" VARCHAR,
  "tipe" VARCHAR,
  "agen1" VARCHAR,
  "agen2" VARCHAR,
  "agen3" VARCHAR,
  "dinas" VARCHAR,
  "lat" VARCHAR,
  "long" VARCHAR,
  "sub1" VARCHAR,
  "sub2" VARCHAR,
  "sub3" VARCHAR,
  "catatanl2" VARCHAR,
  "catatanl3" VARCHAR,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);
CREATE INDEX ON "laporans" ("id");
CREATE INDEX ON "laporans" ("kategori");
CREATE INDEX ON "laporans" ("status");