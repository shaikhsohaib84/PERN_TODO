create database todo;

create table todo(
    id serial primary key,
    title varchar(50) not null,
    description varchar(100) not null
);