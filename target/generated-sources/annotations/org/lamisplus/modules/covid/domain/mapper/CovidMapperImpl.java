package org.lamisplus.modules.covid.domain.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.lamisplus.modules.covid.domain.dto.CodeSetDTO;
import org.lamisplus.modules.covid.domain.dto.CovidEncounterDTO;
import org.lamisplus.modules.covid.domain.dto.CovidPatientDTO;
import org.lamisplus.modules.covid.domain.dto.QuestionAnswerDTO;
import org.lamisplus.modules.covid.domain.dto.QuestionDTO;
import org.lamisplus.modules.covid.domain.dto.QuestionResponseDTO;
import org.lamisplus.modules.covid.domain.dto.VaccinationDoseDTO;
import org.lamisplus.modules.covid.domain.dto.VaccinationEnrollmentDTO;
import org.lamisplus.modules.covid.domain.entity.CodeSet;
import org.lamisplus.modules.covid.domain.entity.CovidEncounter;
import org.lamisplus.modules.covid.domain.entity.CovidPatient;
import org.lamisplus.modules.covid.domain.entity.Question;
import org.lamisplus.modules.covid.domain.entity.QuestionAnswer;
import org.lamisplus.modules.covid.domain.entity.QuestionResponse;
import org.lamisplus.modules.covid.domain.entity.Vaccination;
import org.lamisplus.modules.covid.domain.entity.VaccinationDose;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-03-04T19:19:10+0100",
    comments = "version: 1.4.2.Final, compiler: Eclipse JDT (IDE) 3.37.0.v20240206-1609, environment: Java 17.0.10 (Eclipse Adoptium)"
)
@Component
public class CovidMapperImpl implements CovidMapper {

    @Override
    public CodeSet toCodeSet(CodeSetDTO codeSetDTO) {
        if ( codeSetDTO == null ) {
            return null;
        }

        CodeSet codeSet = new CodeSet();

        codeSet.setCategory( codeSetDTO.getCategory() );
        codeSet.setId( codeSetDTO.getId() );
        codeSet.setName( codeSetDTO.getName() );

        return codeSet;
    }

    @Override
    public CovidEncounter toEncounter(CovidEncounterDTO encounterDTO) {
        if ( encounterDTO == null ) {
            return null;
        }

        CovidEncounter covidEncounter = new CovidEncounter();

        covidEncounter.setCategory( encounterDTO.getCategory() );
        covidEncounter.setId( encounterDTO.getId() );
        covidEncounter.setLocation( encounterDTO.getLocation() );
        covidEncounter.setPatientId( encounterDTO.getPatientId() );
        List<QuestionAnswer> list = encounterDTO.getQuestionAnswers();
        if ( list != null ) {
            covidEncounter.setQuestionAnswers( new ArrayList<QuestionAnswer>( list ) );
        }
        covidEncounter.setVisitDate( encounterDTO.getVisitDate() );

        return covidEncounter;
    }

    @Override
    public CovidPatient toPatient(CovidPatientDTO patientDTO) {
        if ( patientDTO == null ) {
            return null;
        }

        CovidPatient covidPatient = new CovidPatient();

        covidPatient.setAddress( patientDTO.getAddress() );
        covidPatient.setContactPoint( patientDTO.getContactPoint() );
        covidPatient.setCurrentStatus( patientDTO.getCurrentStatus() );
        covidPatient.setDob( patientDTO.getDob() );
        covidPatient.setFirstName( patientDTO.getFirstName() );
        covidPatient.setGender( patientDTO.getGender() );
        covidPatient.setId( patientDTO.getId() );
        covidPatient.setLastName( patientDTO.getLastName() );
        covidPatient.setMidName( patientDTO.getMidName() );
        covidPatient.setParticipantId( patientDTO.getParticipantId() );
        covidPatient.setVaccinationStatus( patientDTO.getVaccinationStatus() );

        return covidPatient;
    }

    @Override
    public Question toQuestion(QuestionDTO questionDTO) {
        if ( questionDTO == null ) {
            return null;
        }

        Question question = new Question();

        question.setCategory( questionDTO.getCategory() );
        question.setDatatype( questionDTO.getDatatype() );
        question.setId( questionDTO.getId() );
        question.setName( questionDTO.getName() );
        List<QuestionResponse> list = questionDTO.getResponses();
        if ( list != null ) {
            question.setResponses( new ArrayList<QuestionResponse>( list ) );
        }

        return question;
    }

    @Override
    public QuestionAnswer toQuestionAnswer(QuestionAnswerDTO questionAnswerDTO) {
        if ( questionAnswerDTO == null ) {
            return null;
        }

        QuestionAnswer questionAnswer = new QuestionAnswer();

        questionAnswer.setAnswer( questionAnswerDTO.getAnswer() );
        questionAnswer.setId( questionAnswerDTO.getId() );
        questionAnswer.setQuestionId( questionAnswerDTO.getQuestionId() );

        return questionAnswer;
    }

    @Override
    public QuestionResponse toQuestionResponse(QuestionResponseDTO questionResponseDTO) {
        if ( questionResponseDTO == null ) {
            return null;
        }

        QuestionResponse questionResponse = new QuestionResponse();

        questionResponse.setId( questionResponseDTO.getId() );
        questionResponse.setName( questionResponseDTO.getName() );

        return questionResponse;
    }

    @Override
    public Vaccination toVaccination(VaccinationEnrollmentDTO vaccinationEnrollmentDTO) {
        if ( vaccinationEnrollmentDTO == null ) {
            return null;
        }

        Vaccination vaccination = new Vaccination();

        vaccination.setId( vaccinationEnrollmentDTO.getId() );
        vaccination.setKnownMedicalCondition( vaccinationEnrollmentDTO.getKnownMedicalCondition() );
        vaccination.setMedicalCondition( vaccinationEnrollmentDTO.getMedicalCondition() );
        vaccination.setOccupation( vaccinationEnrollmentDTO.getOccupation() );
        vaccination.setPatientId( vaccinationEnrollmentDTO.getPatientId() );
        vaccination.setVisitDate( vaccinationEnrollmentDTO.getVisitDate() );
        vaccination.setVisitId( vaccinationEnrollmentDTO.getVisitId() );
        vaccination.setWorkInHealthSector( vaccinationEnrollmentDTO.getWorkInHealthSector() );

        return vaccination;
    }

    @Override
    public VaccinationDose toVaccinationDose(VaccinationDoseDTO vaccinationDoseDTO) {
        if ( vaccinationDoseDTO == null ) {
            return null;
        }

        VaccinationDose vaccinationDose = new VaccinationDose();

        vaccinationDose.setAdverseEffect( vaccinationDoseDTO.getAdverseEffect() );
        vaccinationDose.setBatchNumber( vaccinationDoseDTO.getBatchNumber() );
        vaccinationDose.setDoseNumber( vaccinationDoseDTO.getDoseNumber() );
        vaccinationDose.setId( vaccinationDoseDTO.getId() );
        vaccinationDose.setLocation( vaccinationDoseDTO.getLocation() );
        vaccinationDose.setPatientId( vaccinationDoseDTO.getPatientId() );
        vaccinationDose.setVaccinationFacility( vaccinationDoseDTO.getVaccinationFacility() );
        vaccinationDose.setVaccine( vaccinationDoseDTO.getVaccine() );
        vaccinationDose.setVaccineDate( vaccinationDoseDTO.getVaccineDate() );

        return vaccinationDose;
    }

    @Override
    public CodeSetDTO toCodeSetDto(CodeSet codeSet) {
        if ( codeSet == null ) {
            return null;
        }

        CodeSetDTO codeSetDTO = new CodeSetDTO();

        codeSetDTO.setCategory( codeSet.getCategory() );
        codeSetDTO.setId( codeSet.getId() );
        codeSetDTO.setName( codeSet.getName() );

        return codeSetDTO;
    }

    @Override
    public CovidEncounterDTO toEncounterDto(CovidEncounter encounter) {
        if ( encounter == null ) {
            return null;
        }

        CovidEncounterDTO covidEncounterDTO = new CovidEncounterDTO();

        covidEncounterDTO.setCategory( encounter.getCategory() );
        covidEncounterDTO.setId( encounter.getId() );
        covidEncounterDTO.setLocation( encounter.getLocation() );
        covidEncounterDTO.setPatientId( encounter.getPatientId() );
        List<QuestionAnswer> list = encounter.getQuestionAnswers();
        if ( list != null ) {
            covidEncounterDTO.setQuestionAnswers( new ArrayList<QuestionAnswer>( list ) );
        }
        covidEncounterDTO.setVisitDate( encounter.getVisitDate() );

        return covidEncounterDTO;
    }

    @Override
    public CovidPatientDTO toPatientDto(CovidPatient patient) {
        if ( patient == null ) {
            return null;
        }

        CovidPatientDTO covidPatientDTO = new CovidPatientDTO();

        covidPatientDTO.setAddress( patient.getAddress() );
        covidPatientDTO.setContactPoint( patient.getContactPoint() );
        covidPatientDTO.setCurrentStatus( patient.getCurrentStatus() );
        covidPatientDTO.setDob( patient.getDob() );
        covidPatientDTO.setFirstName( patient.getFirstName() );
        covidPatientDTO.setGender( patient.getGender() );
        covidPatientDTO.setId( patient.getId() );
        covidPatientDTO.setLastName( patient.getLastName() );
        covidPatientDTO.setMidName( patient.getMidName() );
        covidPatientDTO.setParticipantId( patient.getParticipantId() );
        covidPatientDTO.setVaccinationStatus( patient.getVaccinationStatus() );

        return covidPatientDTO;
    }

    @Override
    public QuestionDTO toQuestionDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionDTO questionDTO = new QuestionDTO();

        questionDTO.setCategory( question.getCategory() );
        questionDTO.setDatatype( question.getDatatype() );
        questionDTO.setId( question.getId() );
        questionDTO.setName( question.getName() );
        List<QuestionResponse> list = question.getResponses();
        if ( list != null ) {
            questionDTO.setResponses( new ArrayList<QuestionResponse>( list ) );
        }

        return questionDTO;
    }

    @Override
    public QuestionAnswerDTO toQuestionAnswerDto(QuestionAnswer questionAnswer) {
        if ( questionAnswer == null ) {
            return null;
        }

        QuestionAnswerDTO questionAnswerDTO = new QuestionAnswerDTO();

        questionAnswerDTO.setAnswer( questionAnswer.getAnswer() );
        questionAnswerDTO.setId( questionAnswer.getId() );
        questionAnswerDTO.setQuestionId( questionAnswer.getQuestionId() );

        return questionAnswerDTO;
    }

    @Override
    public QuestionResponseDTO toQuestionResponseDto(QuestionResponse questionResponse) {
        if ( questionResponse == null ) {
            return null;
        }

        QuestionResponseDTO questionResponseDTO = new QuestionResponseDTO();

        questionResponseDTO.setId( questionResponse.getId() );
        questionResponseDTO.setName( questionResponse.getName() );

        return questionResponseDTO;
    }

    @Override
    public VaccinationEnrollmentDTO toVaccinationDto(Vaccination vaccination) {
        if ( vaccination == null ) {
            return null;
        }

        VaccinationEnrollmentDTO vaccinationEnrollmentDTO = new VaccinationEnrollmentDTO();

        vaccinationEnrollmentDTO.setId( vaccination.getId() );
        vaccinationEnrollmentDTO.setKnownMedicalCondition( vaccination.getKnownMedicalCondition() );
        vaccinationEnrollmentDTO.setMedicalCondition( vaccination.getMedicalCondition() );
        vaccinationEnrollmentDTO.setOccupation( vaccination.getOccupation() );
        vaccinationEnrollmentDTO.setPatientId( vaccination.getPatientId() );
        vaccinationEnrollmentDTO.setVisitDate( vaccination.getVisitDate() );
        vaccinationEnrollmentDTO.setVisitId( vaccination.getVisitId() );
        vaccinationEnrollmentDTO.setWorkInHealthSector( vaccination.getWorkInHealthSector() );

        return vaccinationEnrollmentDTO;
    }

    @Override
    public VaccinationDoseDTO toVaccinationDoseDto(VaccinationDose vaccinationDose) {
        if ( vaccinationDose == null ) {
            return null;
        }

        VaccinationDoseDTO vaccinationDoseDTO = new VaccinationDoseDTO();

        vaccinationDoseDTO.setAdverseEffect( vaccinationDose.getAdverseEffect() );
        vaccinationDoseDTO.setBatchNumber( vaccinationDose.getBatchNumber() );
        vaccinationDoseDTO.setDoseNumber( vaccinationDose.getDoseNumber() );
        vaccinationDoseDTO.setId( vaccinationDose.getId() );
        vaccinationDoseDTO.setLocation( vaccinationDose.getLocation() );
        vaccinationDoseDTO.setPatientId( vaccinationDose.getPatientId() );
        vaccinationDoseDTO.setVaccinationFacility( vaccinationDose.getVaccinationFacility() );
        vaccinationDoseDTO.setVaccine( vaccinationDose.getVaccine() );
        vaccinationDoseDTO.setVaccineDate( vaccinationDose.getVaccineDate() );

        return vaccinationDoseDTO;
    }

    @Override
    public List<CodeSetDTO> toCodeSetDtoList(List<CodeSet> codeSets) {
        if ( codeSets == null ) {
            return null;
        }

        List<CodeSetDTO> list = new ArrayList<CodeSetDTO>( codeSets.size() );
        for ( CodeSet codeSet : codeSets ) {
            list.add( toCodeSetDto( codeSet ) );
        }

        return list;
    }

    @Override
    public List<CovidEncounterDTO> toEncounterDtoList(List<CovidEncounter> encounters) {
        if ( encounters == null ) {
            return null;
        }

        List<CovidEncounterDTO> list = new ArrayList<CovidEncounterDTO>( encounters.size() );
        for ( CovidEncounter covidEncounter : encounters ) {
            list.add( toEncounterDto( covidEncounter ) );
        }

        return list;
    }

    @Override
    public List<CovidPatientDTO> toPatientDtoList(List<CovidPatient> patients) {
        if ( patients == null ) {
            return null;
        }

        List<CovidPatientDTO> list = new ArrayList<CovidPatientDTO>( patients.size() );
        for ( CovidPatient covidPatient : patients ) {
            list.add( toPatientDto( covidPatient ) );
        }

        return list;
    }

    @Override
    public List<QuestionDTO> toQuestionDtoList(List<Question> questions) {
        if ( questions == null ) {
            return null;
        }

        List<QuestionDTO> list = new ArrayList<QuestionDTO>( questions.size() );
        for ( Question question : questions ) {
            list.add( toQuestionDto( question ) );
        }

        return list;
    }

    @Override
    public List<QuestionAnswerDTO> toQuestionAnswerDtoList(List<QuestionAnswer> questionAnswers) {
        if ( questionAnswers == null ) {
            return null;
        }

        List<QuestionAnswerDTO> list = new ArrayList<QuestionAnswerDTO>( questionAnswers.size() );
        for ( QuestionAnswer questionAnswer : questionAnswers ) {
            list.add( toQuestionAnswerDto( questionAnswer ) );
        }

        return list;
    }

    @Override
    public List<QuestionResponseDTO> toQuestionResponseDtoList(List<QuestionResponse> questionResponses) {
        if ( questionResponses == null ) {
            return null;
        }

        List<QuestionResponseDTO> list = new ArrayList<QuestionResponseDTO>( questionResponses.size() );
        for ( QuestionResponse questionResponse : questionResponses ) {
            list.add( toQuestionResponseDto( questionResponse ) );
        }

        return list;
    }

    @Override
    public List<VaccinationEnrollmentDTO> toVaccinationDtoList(List<Vaccination> vaccinationList) {
        if ( vaccinationList == null ) {
            return null;
        }

        List<VaccinationEnrollmentDTO> list = new ArrayList<VaccinationEnrollmentDTO>( vaccinationList.size() );
        for ( Vaccination vaccination : vaccinationList ) {
            list.add( toVaccinationDto( vaccination ) );
        }

        return list;
    }

    @Override
    public List<VaccinationDoseDTO> toVaccinationDoseDtoList(List<VaccinationDose> vaccinationDoseList) {
        if ( vaccinationDoseList == null ) {
            return null;
        }

        List<VaccinationDoseDTO> list = new ArrayList<VaccinationDoseDTO>( vaccinationDoseList.size() );
        for ( VaccinationDose vaccinationDose : vaccinationDoseList ) {
            list.add( toVaccinationDoseDto( vaccinationDose ) );
        }

        return list;
    }
}
