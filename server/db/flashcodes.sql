DROP TABLE IF EXISTS public.users;
CREATE TABLE public.users (
    "_id"  varchar NOT NULL,
    "username" varchar(40) NOT NULL,
    "password" varchar(40) NOT NULL,
    PRIMARY KEY ("_id")
);

DROP TABLE IF EXISTS public.flash_cards;
CREATE TABLE public.flash_cards (
    "_id" varchar NOT NULL,
    "problem" varchar(40) NOT NULL,
    "answer" varchar NOT NULL,
    "global_total" varchar(10) NOT NULL,
    "category" varchar(40) NOT NULL,
    "created_by" varchar NOT NULL,
    PRIMARY KEY ("_id")
);

DROP TABLE IF EXISTS public.users_in_cards;
CREATE TABLE public.users_in_cards (
    "_id" varchar NOT NULL,
    "user_id" varchar NOT NULL,
    "flashcard_id" varchar NOT NULL,
    "correct_num" bigint NOT NULL,
    "incorrect_num" bigint NOT NULL,
    PRIMARY KEY ("_id")
);


INSERT INTO flash_cards (_id, problem, answer, global_total, category, created_by) VALUES 
('441448ba-e4e2-4599-bdd4-886d3a014168', 'test problem #1', 'test answer #1', '0', 'Unit 1', 'Default'),
('441448ba-e4e2-4599-bdd4-886d3a014169', 'test problem #2', 'test answer #2', '0', 'Unit 2', 'Default'),
('441448ba-e4e2-4599-bdd4-886d3a014170', 'test problem #3', 'test answer #3', '0', 'Unit 2', 'Default');