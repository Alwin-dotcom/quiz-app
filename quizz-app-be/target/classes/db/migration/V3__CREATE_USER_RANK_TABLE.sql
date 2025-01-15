create table user_rank (
id bigint not null,
email text,
user_name text,
rank integer,
primary key (id));


create sequence user_rank_seq start with 1 increment by 50;
