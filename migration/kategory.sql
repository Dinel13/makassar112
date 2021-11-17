CREATE TABLE "kategoris" (
   "id" bigserial NOT NULL,
   "nama" VARCHAR NOT NULL UNIQUE,
   "created_at" timestamptz NOT NULL DEFAULT (now()),
   "updated_at" timestamptz NOT NULL DEFAULT (now())
)

CREATE INDEX ON "kategoris" ("id");
CREATE INDEX ON "kategoris" ("nama");

