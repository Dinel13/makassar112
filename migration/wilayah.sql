CREATE TABLE "wilayahs" (
   "id" bigserial NOT NULL,
   "nama" VARCHAR NOT NULL UNIQUE,
   "created_at" timestamptz NOT NULL DEFAULT (now()),
   "updated_at" timestamptz NOT NULL DEFAULT (now())
)

CREATE INDEX ON "wilayahs" ("id");
CREATE INDEX ON "wilayahs" ("nama");

