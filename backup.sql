--
-- PostgreSQL database dump
--

-- Dumped from database version 11.11 (Ubuntu 11.11-1.pgdg20.04+1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: btree_gin; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gin WITH SCHEMA public;


--
-- Name: EXTENSION btree_gin; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gin IS 'support for indexing common datatypes in GIN';


--
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: cube; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;


--
-- Name: EXTENSION cube; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';


--
-- Name: dblink; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dblink WITH SCHEMA public;


--
-- Name: EXTENSION dblink; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dblink IS 'connect to other PostgreSQL databases from within a database';


--
-- Name: dict_int; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_int WITH SCHEMA public;


--
-- Name: EXTENSION dict_int; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_int IS 'text search dictionary template for integers';


--
-- Name: dict_xsyn; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_xsyn WITH SCHEMA public;


--
-- Name: EXTENSION dict_xsyn; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_xsyn IS 'text search dictionary template for extended synonym processing';


--
-- Name: earthdistance; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;


--
-- Name: EXTENSION earthdistance; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- Name: intarray; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS intarray WITH SCHEMA public;


--
-- Name: EXTENSION intarray; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION intarray IS 'functions, operators, and index support for 1-D arrays of integers';


--
-- Name: ltree; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;


--
-- Name: EXTENSION ltree; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track execution statistics of all SQL statements executed';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgrowlocks; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgrowlocks WITH SCHEMA public;


--
-- Name: EXTENSION pgrowlocks; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgrowlocks IS 'show row-level locking information';


--
-- Name: pgstattuple; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgstattuple WITH SCHEMA public;


--
-- Name: EXTENSION pgstattuple; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgstattuple IS 'show tuple-level statistics';


--
-- Name: tablefunc; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS tablefunc WITH SCHEMA public;


--
-- Name: EXTENSION tablefunc; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION tablefunc IS 'functions that manipulate whole tables, including crosstab';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: xml2; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS xml2 WITH SCHEMA public;


--
-- Name: EXTENSION xml2; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION xml2 IS 'XPath querying and XSLT';


SET default_tablespace = '';

--
-- Name: flash_cards; Type: TABLE; Schema: public; Owner: mrlqiwup
--

CREATE TABLE public.flash_cards (
    _id character varying NOT NULL,
    problem character varying(40) NOT NULL,
    answer character varying NOT NULL,
    global_total character varying(10) NOT NULL,
    category character varying(40) NOT NULL,
    created_by character varying NOT NULL
);


ALTER TABLE public.flash_cards OWNER TO mrlqiwup;

--
-- Name: users; Type: TABLE; Schema: public; Owner: mrlqiwup
--

CREATE TABLE public.users (
    _id character varying NOT NULL,
    username character varying(40) NOT NULL,
    password character varying(40) NOT NULL
);


ALTER TABLE public.users OWNER TO mrlqiwup;

--
-- Name: users_in_cards; Type: TABLE; Schema: public; Owner: mrlqiwup
--

CREATE TABLE public.users_in_cards (
    _id character varying NOT NULL,
    user_id character varying NOT NULL,
    flashcard_id character varying NOT NULL,
    correct_num bigint NOT NULL,
    incorrect_num bigint NOT NULL
);


ALTER TABLE public.users_in_cards OWNER TO mrlqiwup;

--
-- Data for Name: flash_cards; Type: TABLE DATA; Schema: public; Owner: mrlqiwup
--

COPY public.flash_cards (_id, problem, answer, global_total, category, created_by) FROM stdin;
441448ba-e4e2-4599-bdd4-886d3a014170	test problem #3	test answer #3	0	Unit 2	Default
441448ba-e4e2-4599-bdd4-886d3a014169	test problem #2	test answer #2	1	Unit 2	Default
441448ba-e4e2-4599-bdd4-886d3a014168	test problem #1	test answer #1	3	Unit 1	Default
32849210-cb18-46f1-a7b9-3fce4eb7ad55	Postman Test	Answer deez nuts	0	Unit 2	2
e8d30a0c-ddf4-448a-9dc8-5994fff93b76	What is an algorithm?	beep boop beep	0	Unit 1	cc5dd403-59f3-48d3-b02c-27379acbaa46
261fd23d-9d52-4f00-8b6d-2eb1e4f128a4	What does DOM stand for?	Document Object Model	0	Unit 4	3bd490e9-2be2-4894-944f-f6b3def6e70c
0d17e3d5-d5a6-49f2-879d-47b3ecff66f5	Who is your favorite doggo?	Nini	0	Unit 2	cc5dd403-59f3-48d3-b02c-27379acbaa46
f1daa981-cb61-43e5-a42d-0179bea85ecc	Do you like eggs?	yes	0	Unit 4	cc5dd403-59f3-48d3-b02c-27379acbaa46
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mrlqiwup
--

COPY public.users (_id, username, password) FROM stdin;
1	test	test123
2	test1	test123
4c4f4dfe-f203-4d78-bef2-3df860747336	Kaeny	Test
63100c8a-94cf-4bd1-98a0-6f36b13d680a	andy	tsou
512029d4-19a5-4aec-b3c7-aeb5c4d0830f	big	boi
cc5dd403-59f3-48d3-b02c-27379acbaa46	gang	gang
3bd490e9-2be2-4894-944f-f6b3def6e70c	viet	cs
\.


--
-- Data for Name: users_in_cards; Type: TABLE DATA; Schema: public; Owner: mrlqiwup
--

COPY public.users_in_cards (_id, user_id, flashcard_id, correct_num, incorrect_num) FROM stdin;
3	2	441448ba-e4e2-4599-bdd4-886d3a014169	1	1
1	1	441448ba-e4e2-4599-bdd4-886d3a014168	3	0
2	1	441448ba-e4e2-4599-bdd4-886d3a014169	1	2
d033cb77-525d-42e7-9b70-783b7b393133	2	441448ba-e4e2-4599-bdd4-886d3a014168	1	1
\.


--
-- Name: flash_cards flash_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: mrlqiwup
--

ALTER TABLE ONLY public.flash_cards
    ADD CONSTRAINT flash_cards_pkey PRIMARY KEY (_id);


--
-- Name: users_in_cards users_in_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: mrlqiwup
--

ALTER TABLE ONLY public.users_in_cards
    ADD CONSTRAINT users_in_cards_pkey PRIMARY KEY (_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: mrlqiwup
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (_id);


--
-- PostgreSQL database dump complete
--

