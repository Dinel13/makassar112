create table "users"
(
    id          serial
        constraint user_pk
            primary key,
    nama        varchar not null,
    email       varchar not null,
    password       varchar not null,
    reset_token text
);

create unique index user_id_uindex
    on "user" (id);

create unique 
    on "user" (email);