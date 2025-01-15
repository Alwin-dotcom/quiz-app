create table question_answer (
id bigint not null,
answers jsonb,
createdAt timestamp,
creator text,
module text,
question text,
primary key (id));


create sequence seq start with 1 increment by 50;
