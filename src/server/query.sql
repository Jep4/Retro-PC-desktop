CREATE DATABASE IF NOT EXISTS web_db;
USE web_db;

create table if not exists Messages (
id VARCHAR(45) NOT NULL,
body VARCHAR(100) not null,
created DATE not null,
PRIMARY KEY(id)
);
INSERT INTO Messages (body, created, id) VALUES ('Sample message', now(), '1');
SELECT all body from Messages;
