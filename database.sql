--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customer_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer_details (
    sno integer NOT NULL,
    customer_name text,
    age integer,
    phone text,
    location text,
    created_at timestamp without time zone
);


ALTER TABLE public.customer_details OWNER TO postgres;

--
-- Name: customer_details_sno_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.customer_details ALTER COLUMN sno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.customer_details_sno_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



--
-- Name: customer_details customer_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_details
    ADD CONSTRAINT customer_details_pkey PRIMARY KEY (sno);

--
-- PostgreSQL database dump complete
--

