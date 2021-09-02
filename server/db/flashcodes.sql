DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.flash_cards CASCADE;
DROP TABLE IF EXISTS public.users_in_cards;

CREATE TABLE public.users (
    "_id"  varchar NOT NULL,
    "username" varchar NOT NULL,
    "password" varchar NOT NULL,
    PRIMARY KEY ("_id")
);

CREATE TABLE public.flash_cards (
    "_id" varchar NOT NULL,
    "problem" varchar NOT NULL,
    "answer" varchar NOT NULL,
    "global_total" bigint NOT NULL,
    "category" varchar NOT NULL,
    "created_by" varchar NOT NULL,
    "is_public" boolean NOT NULL,
    "created_by_id" varchar NOT NULL,
    PRIMARY KEY ("_id"),

    FOREIGN KEY("created_by_id") REFERENCES public.users("_id")
);

CREATE TABLE public.users_in_cards (
    "_id" varchar NOT NULL,
    "user_id" varchar NOT NULL,
    "flashcard_id" varchar NOT NULL,
    "correct_num" bigint NOT NULL,
    "incorrect_num" bigint NOT NULL,
    PRIMARY KEY ("_id")
);


INSERT INTO users (_id, username, password ) VALUES
('1', 'test',  'test123'),
('2', 'test1', 'test123'),
('4c4f4dfe-f203-4d78-bef2-3df860747336','Kaeny','Test'),
('63100c8a-94cf-4bd1-98a0-6f36b13d680a', 'andy', 'tsou'),
('512029d4-19a5-4aec-b3c7-aeb5c4d0830f', 'big', 'boi'),
('cc5dd403-59f3-48d3-b02c-27379acbaa46', 'gang', 'gang'),
('3bd490e9-2be2-4894-944f-f6b3def6e70c','viet', 'cs');

INSERT INTO flash_cards (_id, problem, answer, global_total, category, created_by, is_public, created_by_id) VALUES 
('441448ba-e4e2-4599-bdd4-886d3a014168', 'test problem #1', 'test answer #1', 0, 'Unit 1', 'test', 'true', '1'),
('441448ba-e4e2-4599-bdd4-886d3a014169', 'test problem #2', 'test answer #2', 0, 'Unit 2', 'test', 'false', '1'),
('441448ba-e4e2-4599-bdd4-886d3a014170', 'test problem #3', 'test answer #3', 0, 'Unit 2', 'test', 'true', '1'),
('32849210-cb18-46f1-a7b9-3fce4eb7ad55', 'Postman Test', 'Answer deez nuts', 0,	'Unit 2', 'test', 'false', '1'),
('e8d30a0c-ddf4-448a-9dc8-5994fff93b76', 'What is an algorithm?', 'beep boop beep', 0, 'Unit 1', 'test1', 'true', '2'),
('261fd23d-9d52-4f00-8b6d-2eb1e4f128a4', 'What does DOM stand for?', 'Document Object Model', 0, 'Unit 4', 'test1', 'true', '2'),
('0d17e3d5-d5a6-49f2-879d-47b3ecff66f5', 'Who is your favorite doggo?',	'Nini',	0, 'Unit 2', 'test1', 'false', '2'),
('f1daa981-cb61-43e5-a42d-0179bea85ecc', 'Do you like eggs?', 'yes', 0,	'Unit 4', 'test1', 'false', '2');

INSERT INTO users_in_cards (_id, user_id, flashcard_id, correct_num, incorrect_num) VALUES
('3', '2', '441448ba-e4e2-4599-bdd4-886d3a014169', 1, 1),
('1', '1', '441448ba-e4e2-4599-bdd4-886d3a014168', 3, 0),
('2',	'1',	'441448ba-e4e2-4599-bdd4-886d3a014169',	1,	2),
('d033cb77-525d-42e7-9b70-783b7b393133',	'2',	'441448ba-e4e2-4599-bdd4-886d3a014168',	1,	1);