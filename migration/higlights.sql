DROP TABLE IF EXISTS "higlights";

CREATE TABLE "higlights" (
   "id" bigserial NOT NULL,
   "laporan_id" VARCHAR NOT NULL UNIQUE,
   "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "higlights" ("id");
CREATE INDEX ON "higlights" ("laporan_id");

ALTER TABLE "higlights" ADD FOREIGN KEY ("laporan_id") REFERENCES "laporans" ("id_laporan") ON DELETE CASCADE;
