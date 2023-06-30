--covid_vaccination
CREATE SEQUENCE covid_vaccination_id_seq;
CREATE TABLE public.covid_vaccination
(
    id bigint NOT NULL DEFAULT nextval('covid_vaccination_id_seq'),
    uuid character varying(100),
    patient_int bigint,
    patient_uuid bigint,
    facility_id int,
    facility_uuid character varying(100),
    visit_id bigint,
    visit_date timestamp,
    work_in_health_sector boolean,
    occupation integer,
    known_medical_condition boolean,
    medical_condition character varying(600),
    vaccine_id character varying(100),
    date_created timestamp,
    created_by int,
    date_modified timestamp,
    modified_by int,
    archived int,
    PRIMARY KEY (id)
);
ALTER SEQUENCE covid_vaccination_id_seq OWNED BY covid_vaccination.id;


--covid_vaccination_dose
CREATE SEQUENCE covid_vaccination_dose_id_seq;
CREATE TABLE public.covid_vaccination_dose
(
    id bigint NOT NULL DEFAULT nextval('covid_vaccination_dose_id_seq'),
    uuid character varying(100),
    patient_id bigint,
    dose_number integer,
    vaccine integer,
    vaccine_date date,
    location character varying(200),
    vaccination_facility character varying(100),
    batch_no character varying(100),
    adverse_effect character varying(500),
    date_created timestamp,
    created_by int,
    date_modified timestamp,
    modified_by int,
    archived int,
    PRIMARY KEY (id)
);
ALTER SEQUENCE covid_vaccination_dose_id_seq OWNED BY covid_vaccination_dose.id;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Positive', 'HIV STATUS');
insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Negative', 'HIV STATUS');
insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Unknown', 'HIV STATUS');

insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'AstraZeneca', 'VACCINE');
insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Pfizer', 'VACCINE');
insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Moderna', 'VACCINE');
insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Janssen', 'VACCINE');
insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'AZ', 'VACCINE');
insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Sinovac', 'VACCINE');
insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Sinopharm', 'VACCINE');
insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Bharat (Covaxin)', 'VACCINE');
insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Sputnik', 'VACCINE');
insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Other', 'VACCINE');
insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Unknown', 'VACCINE');

insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Facility', 'LOCATION');
insert into covid_codeset(uuid, name, category)values(uuid_generate_v4(), 'Community', 'LOCATION');
