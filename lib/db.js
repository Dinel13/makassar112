const pgp = require("pg-promise")({
  noWarnings: true,
});

export const db = pgp(`postgres://din:postgres@localhost:5432/makassar112`);
