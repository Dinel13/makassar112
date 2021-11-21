create table "users"
(
    "id"          bigserial not null,
    "nama"        varchar not null,
    "email"       varchar not null unique,
    "password"       varchar not null,
    "reset_token" text default null
);

create index on "users" ("id");

create index on "users" ("email");