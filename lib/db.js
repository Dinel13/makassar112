const pgp = require("pg-promise")({
  noWarnings: true,
});

export const db = pgp(`postgres://postgres:root@localhost:5432/postgres`);
