DROP TABLE IF EXISTS covid_patient_medication_detail;
DROP TABLE IF EXISTS covid_patient_vaccine;
DROP TABLE IF EXISTS covid_patient;
DROP TABLE IF EXISTS covid_demographic;
DROP TABLE IF EXISTS covid_inclusioncriteria;
DROP TABLE IF EXISTS covid_patient_comorbidity;
DROP TABLE IF EXISTS covid_patient_medication;
DROP TABLE IF EXISTS covid_patient_reinfection;
DROP TABLE IF EXISTS covid_patientstatus;
DROP TABLE IF EXISTS covid_patient_symptom;
DROP TABLE IF EXISTS covid_patient_vitalsign;
DROP TABLE IF EXISTS covid_question;
DROP TABLE IF EXISTS covid_question_response;
DROP TABLE IF EXISTS covid_encounter;
DROP TABLE IF EXISTS covid_question_answer;


--covid_patient
CREATE SEQUENCE covid_patient_id_seq;
CREATE TABLE public.covid_patient
(
    id bigint NOT NULL DEFAULT nextval('covid_patient_id_seq'),
    uuid character varying(100),
    first_name character varying(100),
	mid_name character varying(100),
    last_name character varying(100),
	participant_id character varying(100),
	gender integer,
	dob date,
	phone character varying(100),
	address character varying(200),
	current_status character varying(200),
	vaccination_status character varying(200),
    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.covid_patient OWNER to postgres;	
ALTER SEQUENCE covid_patient_id_seq OWNED BY covid_patient.id;


--covid question
CREATE SEQUENCE covid_question_id_seq;
CREATE TABLE public.covid_question
(
    id bigint NOT NULL DEFAULT nextval('covid_question_id_seq'),
    uuid character varying(100),
    name character varying(500),	
	category character varying(100),
	datatype character varying(100), 
    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.covid_question OWNER to postgres;	
ALTER SEQUENCE covid_question_id_seq OWNED BY covid_question.id;


--covid response
CREATE SEQUENCE covid_question_response_id_seq;
CREATE TABLE public.covid_question_response
(
    id bigint NOT NULL DEFAULT nextval('covid_question_response_id_seq'),
	question_id integer,
    uuid character varying(100),
    name character varying(500),
    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.covid_question_response OWNER to postgres;	
ALTER SEQUENCE covid_question_response_id_seq OWNED BY covid_question_response.id;


--covid_encounter
CREATE SEQUENCE covid_encounter_id_seq;
CREATE TABLE public.covid_encounter
(
    id bigint NOT NULL DEFAULT nextval('covid_encounter_id_seq'),
    uuid character varying(100),
    patient_id integer,
	visit_date date,
	category character varying(200),
	location character varying(200),
    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.covid_encounter OWNER to postgres;	
ALTER SEQUENCE covid_encounter_id_seq OWNED BY covid_encounter.id;


--covid_question_answer
CREATE SEQUENCE covid_question_answer_id_seq;
CREATE TABLE public.covid_question_answer
(
    id bigint NOT NULL DEFAULT nextval('covid_question_answer_id_seq'),
    uuid character varying(100),
    question_id integer,
	answer character varying(1000),
	encounter_id integer,
    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.covid_question_answer OWNER to postgres;	
ALTER SEQUENCE covid_question_answer_id_seq OWNED BY covid_question_answer.id;


--covid_codeset
CREATE SEQUENCE covid_codeset_id_seq;
CREATE TABLE public.covid_codeset
(
    id bigint NOT NULL DEFAULT nextval('covid_codeset_id_seq'),
    uuid character varying(100),
	name character varying(200),
	category character varying(1000),
    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.covid_codeset OWNER to postgres;	
ALTER SEQUENCE covid_codeset_id_seq OWNED BY covid_codeset.id;

insert into covid_codeset(name, category) values('Not Vaccinated', 'VACCINATION_STATUS');
insert into covid_codeset(name, category) values('Partially Vaccinated', 'VACCINATION_STATUS');
insert into covid_codeset(name, category) values('Fully Vaccinated', 'VACCINATION_STATUS');
insert into covid_codeset(name, category) values('Admission', 'CURRENT_STATUS');
insert into covid_codeset(name, category) values('ICU', 'CURRENT_STATUS');
insert into covid_codeset(name, category) values('Discharged', 'CURRENT_STATUS');
insert into covid_codeset(name, category) values('Died', 'CURRENT_STATUS');


--vaccination questions
insert into covid_question(name, category, datatype) values('Dose 1, specify', 'VACCINATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Pfizer');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Moderna');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Janssen');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'AZ');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sinovac');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sinopharm');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Bharat (Covaxin)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sputnik');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Date of the 1st dose', 'VACCINATION', 'date');

insert into covid_question(name, category, datatype) values('Batch Number of COVID-19 Vaccine First Dose', 'VACCINATION', 'text');
insert into covid_question(name, category, datatype) values('Location of COVID-19 Vaccine First Dose', 'VACCINATION', 'text');
insert into covid_question(name, category, datatype) values('Facility/Community of COVID-19 Vaccine First Dose', 'VACCINATION', 'text');
insert into covid_question(name, category, datatype) values('Adverse Effects following COVID-19 Vaccine First Dose', 'VACCINATION', 'text');
insert into covid_question(name, category, datatype) values('Date of onset of Adverse Effects following COVID-19 Vaccine First Dose', 'VACCINATION', 'date');

insert into covid_question(name, category, datatype) values('Dose 2, specify', 'VACCINATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Pfizer');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Moderna');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Janssen');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'AZ');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sinovac');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sinopharm');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Bharat (Covaxin)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sputnik');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Date of the 2nd dose', 'VACCINATION', 'date');

insert into covid_question(name, category, datatype) values('Batch Number of COVID-19 Vaccine Second Dose', 'VACCINATION', 'text');
insert into covid_question(name, category, datatype) values('Location of COVID-19 Vaccine Second Dose', 'VACCINATION', 'text');
insert into covid_question(name, category, datatype) values('Facility/Community of COVID-19 Vaccine Second Dose', 'VACCINATION', 'text');
insert into covid_question(name, category, datatype) values('Adverse Effects following COVID-19 Vaccine Second Dose', 'VACCINATION', 'text');
insert into covid_question(name, category, datatype) values('Date of onset of Adverse Effects following COVID-19 Vaccine Second Dose', 'VACCINATION', 'date');

insert into covid_question(name, category, datatype) values('Dose 3, specify', 'VACCINATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Pfizer');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Moderna');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Janssen');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'AZ');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sinovac');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sinopharm');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Bharat (Covaxin)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sputnik');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Date of the 3rd dose', 'VACCINATION', 'date');

insert into covid_question(name, category, datatype) values('Batch Number of COVID-19 Vaccine Third (Booster) Dose', 'VACCINATION', 'text');
insert into covid_question(name, category, datatype) values('Location of COVID-19 Vaccine Third (Booster) Dose', 'VACCINATION', 'text');
insert into covid_question(name, category, datatype) values('Facility/Community of COVID-19 Vaccine Third (Booster) Dose', 'VACCINATION', 'text');
insert into covid_question(name, category, datatype) values('Adverse Effects following COVID-19 Vaccine Third (Booster) Dose', 'VACCINATION', 'text');
insert into covid_question(name, category, datatype) values('Date of onset of Adverse Effects following COVID-19 Vaccine Third (Booster) Dose', 'VACCINATION', 'date');
insert into covid_question(name, category, datatype) values('Date of Declining COVID-19 Vaccination', 'VACCINATION', 'date');
insert into covid_question(name, category, datatype) values('Reasons for declining COVID-19 Vaccination', 'VACCINATION', 'text');



--Vaccination history questions
insert into covid_question(name, category, datatype) values('Did the patient receive a COVID-19 vaccine?', 'VACCINATION_STATUS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Source of information', 'VACCINATION_STATUS', 'checkbox');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Documented evidence (vaccine card/vaccine passport/facility-based record/other)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Recall');

insert into covid_question(name, category, datatype) values('If yes, number of doses received', 'VACCINATION_STATUS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), '1');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), '2');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), '3');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Dose 1, specify', 'VACCINATION_STATUS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Pfizer');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Moderna');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Janssen');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'AZ');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sinovac');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sinopharm');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Bharat (Covaxin)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sputnik');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Date of the 1st dose', 'VACCINATION_STATUS', 'date');

insert into covid_question(name, category, datatype) values('Dose 2, specify', 'VACCINATION_STATUS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Pfizer');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Moderna');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Janssen');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'AZ');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sinovac');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sinopharm');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Bharat (Covaxin)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sputnik');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Date of the 2nd dose', 'VACCINATION_STATUS', 'date');

insert into covid_question(name, category, datatype) values('Dose 3, specify', 'VACCINATION_STATUS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Pfizer');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Moderna');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Janssen');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'AZ');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sinovac');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sinopharm');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Bharat (Covaxin)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sputnik');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Date of the 3rd dose', 'VACCINATION_STATUS', 'date');



--inclusion criteria questions
insert into covid_question(name, category, datatype) values('Presence of signs or symptoms suggestive of COVID-19', 'INCLUSION_CRITERIA', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Laboratory confirmation of COVID-19 (antigen test or molecular test)', 'INCLUSION_CRITERIA', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If positive, date of most recent test', 'INCLUSION_CRITERIA', 'date');



--Demographics questions
insert into covid_question(name, category, datatype) values('If date of birth is unknown, record: Age', 'DEMOGRAPHICS', 'number');

insert into covid_question(name, category, datatype) values('If child < 5 years, specify age in months', 'DEMOGRAPHICS', 'number');

insert into covid_question(name, category, datatype) values('If infant < 12 months of age, were they born preterm (<37 weeks’ gestation)?', 'DEMOGRAPHICS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If infant < 12 months of age, were they born low birth weight (<2.5 kg)?', 'DEMOGRAPHICS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If infant with low birth weight, specify weight at birth (kg)', 'DEMOGRAPHICS', 'number');
insert into covid_question(name, category, datatype) values('Race/ethnicity (tick all that apply)', 'DEMOGRAPHICS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Asian');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'African/Black');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Caucasian/White');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Hispanic/Latino');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Health worker in contact with patients?', 'DEMOGRAPHICS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Currently pregnant?', 'DEMOGRAPHICS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If No, was she pregnant within ≤ 21 days of pregnancy outcome from admission?', 'DEMOGRAPHICS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If No, was she pregnant within 22-42 days from admission?', 'DEMOGRAPHICS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If currently or recently pregnant within≤ 21 days, gestational age:', 'DEMOGRAPHICS', 'select');



--Admission vital signs
insert into covid_question(name, category, datatype) values('Symptom onset (date of first/earliest symptom)', 'ADMISSION_VITAL_SIGNS', 'date');

insert into covid_question(name, category, datatype) values('Admission date at this facility', 'ADMISSION_VITAL_SIGNS', 'date');

insert into covid_question(name, category, datatype) values('Was the patient transferred to this facility from another facility during this illness?', 'ADMISSION_VITAL_SIGNS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Temperature', 'ADMISSION_VITAL_SIGNS', 'number');

insert into covid_question(name, category, datatype) values('Heart rate', 'ADMISSION_VITAL_SIGNS', 'number');

insert into covid_question(name, category, datatype) values('Respiratory rate', 'ADMISSION_VITAL_SIGNS', 'number');

insert into covid_question(name, category, datatype) values('Blood pressure (Systolic)', 'ADMISSION_VITAL_SIGNS', 'number');

insert into covid_question(name, category, datatype) values('Blood pressure (Diastolic)', 'ADMISSION_VITAL_SIGNS', 'number');

insert into covid_question(name, category, datatype) values('Oxygen saturation', 'ADMISSION_VITAL_SIGNS', 'number');

insert into covid_question(name, category, datatype) values('Oxygen saturation on', 'ADMISSION_VITAL_SIGNS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Room air');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Oxygen therapy');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('AVPU', 'ADMISSION_VITAL_SIGNS', 'text');

insert into covid_question(name, category, datatype) values('Mid-upper arm circumference (mm)', 'ADMISSION_VITAL_SIGNS', 'number');

insert into covid_question(name, category, datatype) values('Height (cm)', 'ADMISSION_VITAL_SIGNS', 'number');

insert into covid_question(name, category, datatype) values('Weight (kg)', 'ADMISSION_VITAL_SIGNS', 'number');



--comorbidities
insert into covid_question(name, category, datatype) values('Chronic cardiac disease(not hypertension)', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Hypertension', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Chronic pulmonary disease', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Asthma', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Chronic kidney disease', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Chronic liver disease', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Autoimmune disease', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Chronic neurological disorder', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Immunodeficiency', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Dementia', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Diabetes mellitus', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Current smoking', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Tuberculosis (active)', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Tuberculosis (previous)', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Cerebrovascular disease', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Malignant neoplasm(active, past 6 months)', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Malignant neoplasm(remission, > 6 months)(active, past 6 months)', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Mental health disorder', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Other', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify', 'COMORBIDITIES', 'text');

insert into covid_question(name, category, datatype) values('HIV', 'COMORBIDITIES', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes (on antiretroviral therapy/ART)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes (not on antiretroviral therapy/ART)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');



--REINFECTION WITH COVID-19
insert into covid_question(name, category, datatype) values('HIV', 'REINFECTION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify', 'REINFECTION', 'text');

insert into covid_question(name, category, datatype) values('Date of onset of previous episode', 'REINFECTION', 'date');

insert into covid_question(name, category, datatype) values('Was the previous episode of COVID-19 confirmed by a laboratory test?', 'REINFECTION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Was the patient admitted to a hospital during the previous episode?', 'REINFECTION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify date of hospital admission for the previous episode', 'REINFECTION', 'date');


--Signs and symptoms
insert into covid_question(name, category, datatype) values('History of fever', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Cough with sputum production', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Cough with haemoptysis', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Sore throat', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Runny nose (rhinorrhea)', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Wheezing', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Chest pain', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Muscle aches (myalgia)', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Joint pain (arthralgia)', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Fatigue/malaise', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Loss of taste', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Loss of smell', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Shortness of breath', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Lower chest indrawing', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Headache', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Altered consciousness/confusion', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Seizures', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Vomiting/nausea', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Diarrhoea', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Conjunctivitis', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Skin rash', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Intracerebral haemorrhage', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Ischaemic stroke', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Lymphadenopathy', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Inability to walk', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Blurry vision', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Peeling or swelling of oral mucosa hands/feet', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Other', 'SIGNS_AND_SYMPTOMS', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify', 'SIGNS_AND_SYMPTOMS', 'text');


--chronic medication
insert into covid_question(name, category, datatype) values('Oxygen therapy', 'CHRONIC_MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Colchicine', 'CHRONIC_MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Hydroxychloroquine', 'CHRONIC_MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Ivermectin', 'CHRONIC_MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Systemic corticosteroids', 'CHRONIC_MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Antifungals', 'CHRONIC_MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Antivirals', 'CHRONIC_MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify the drug', 'CHRONIC_MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Fluvoxamine');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Molnupinavir');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Oseltamivir');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Antibiotics', 'CHRONIC_MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify the drug', 'CHRONIC_MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Azithromycin');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Ciprofloxacin/Levofloxacin');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Amoxicillin/Clavulanic acid');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');


--Medication
insert into covid_question(name, category, datatype) values('Blood-derived products received?', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'IV immune globulin');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Convalescent plasma');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');

insert into covid_question(name, category, datatype) values('Hydroxychloroquine received?', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Ivermectin', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Experimental agents received?', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Phytotherapy received?', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('IL-1 antagonists received?', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Anakinra');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Canakinumab');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other IL-1 antagonist');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('IL-6 antagonists received?', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Siltuximab');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sarilumab');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other IL-6 antagonist');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Janus kinase inhibitors received?', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify:', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Acalabrutinib');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Ibrutinib');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Zanubrutinib');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Baricitinib');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Ruxolitinib');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Tofacitinib');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other kinase inhibitors');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Neutralizing monoclonal antibodies received?', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Casirivimab and Imdevimab');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Sotrovimab');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Bamlanivimab and Etesevimab');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Steroids received?', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Dexamethasone');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Hydrocortisone');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Prednisone');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Methylprednisolone');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Antithrombotic/anticoagulation drugs received?', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unfractionated heparin');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Low molecular weight heparin');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Warfarin');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Direct oral anticoagulant');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Antiviral drugs received?', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Remdesivir');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Lopinavir/Ritonavir');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Molnupiravir');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Favipiravir');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Acyclovir/Ganciclovir');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If HIV positive, ART received', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), '2 NRTI + Dolutegravir');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), '2 NRTI + NNRTIs');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), '2 NRTI + Raltegravir');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), '2 NRTI + protease inhibitor');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Antibiotic received?', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Macrolides (e.g. Azithromycin, Clarithromycin)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Fluoroquinolones (e.g. Ciprofloxacin, Levofloxacin, Moxifloxacin)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), '3rd and 4th generation Cephalosporin (e.g. Ceftriaxone, Cefotaxime, Ceftazidime, Cefepime)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), '5th generation Cephalosporin (e.g. Ceftolozane/Tazobactam)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Ceftazidime/Avibactam');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Carbapenems (e.g. Imipenem, Meropenem)');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Piperacillin-Tazobactam');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Amoxicillin-Clavulanic acid');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Cotrimoxazole');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Colistin');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Gentamicin or Amikacin');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Vancomycin or Teicoplanin');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Daptomycin');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Linezolid or Tedizolid');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Antifungal received?', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If yes, specify', 'MEDICATION', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Amphotericin B');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Fluconazole');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Itraconazole');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Flucytosine');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Other');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');


--Suportive care
insert into covid_question(name, category, datatype) values('ICU or high dependency unit admission?', 'SUPPORTIVE_CARE', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Source of oxygen', 'SUPPORTIVE_CARE', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Piped');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Cylinder');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Concentrator');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Oxygen therapy?', 'SUPPORTIVE_CARE', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Interface', 'SUPPORTIVE_CARE', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Nasal prongs');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'HF nasal cannula');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Simple face mask');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Venturi mask');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Mask with reservoir');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'CPAP/BiPAP');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Intubated');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If using any of the following: nasal prongs; or simple face mask; or venturi mask; or mask with reservoir: specify: max O2 flow:', 'SUPPORTIVE_CARE', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), '1–5 L/min');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), '6–10 L/min');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), '11–15 L/min');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), '> 15 L/min');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('If HF nasal cannula, specify: max FiO2', 'SUPPORTIVE_CARE', 'text');

insert into covid_question(name, category, datatype) values('max O2 flow rate', 'SUPPORTIVE_CARE', 'text');

insert into covid_question(name, category, datatype) values('If non-invasive ventilation (e.g. BiPAP/CPAP), specify: max IPAP', 'SUPPORTIVE_CARE', 'text');

insert into covid_question(name, category, datatype) values('max EPAP', 'SUPPORTIVE_CARE', 'text');

insert into covid_question(name, category, datatype) values('max FiO2', 'SUPPORTIVE_CARE', 'text');

insert into covid_question(name, category, datatype) values('If invasive ventilation, specify: max PEEP', 'SUPPORTIVE_CARE', 'text');

insert into covid_question(name, category, datatype) values('max FiO2', 'SUPPORTIVE_CARE', 'text');

insert into covid_question(name, category, datatype) values('Extracorporeal (ECMO) support?', 'SUPPORTIVE_CARE', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Inotropes/vasopressors?', 'SUPPORTIVE_CARE', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Blood transfusion', 'SUPPORTIVE_CARE', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Prone position?', 'SUPPORTIVE_CARE', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Renal replacement therapy', 'SUPPORTIVE_CARE', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');

insert into covid_question(name, category, datatype) values('Plasma exchange therapy', 'SUPPORTIVE_CARE', 'select');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Yes');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'No');
insert into covid_question_response(question_id, name) values((select max(id) from covid_question), 'Unknown');


