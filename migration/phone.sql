CREATE TABLE "phones" (
   "id" bigserial NOT NULL,
   "nama" VARCHAR NOT NULL,
   "phone" VARCHAR NOT NULL,
   "kategori" VARCHAR NOT NULL,
   "alamat" VARCHAR NOT NULL,
   "lokasi" TEXT NOT NULL,
   "status" VARCHAR NOT NULL,
   "created_at" timestamptz NOT NULL DEFAULT (now()),
   "updated_at" timestamptz NOT NULL DEFAULT (now())
)

CREATE INDEX ON "phones" ("id");
CREATE INDEX ON "phones" ("nama");
CREATE INDEX ON "phones" ("kategori");
CREATE INDEX ON "phones" ("status");

