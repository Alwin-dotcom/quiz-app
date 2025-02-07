create table user_table (
id bigint,
user_name text,
email text,
password text,
role text,
primary key (id)
);

create sequence user_table_seq start with 1 increment by 1;