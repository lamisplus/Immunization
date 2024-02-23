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
    date = "2024-02-23T09:51:01+0100",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 1.8.0_381 (Oracle Corporation)"
)
@Component
public class CovidMapperImpl implements CovidMapper {

    @Override
    public CodeSet toCodeSet(CodeSetDTO codeSetDTO) {
        if ( codeSetDTO == null ) {
            return null;
        }

        CodeSet codeSet = new CodeSet();

        codeSet.setId( codeSetDTO.getId() );
        codeSet.setName( codeSetDTO.getName() );
        codeSet.setCategory( codeSetDTO.getCategory() );

        return codeSet;
    }

    @Override
    public CovidEncounter toEncounter(CovidEncounterDTO encounterDTO) {
        if ( encounterDTO == null ) {
            return null;
        }

        CovidEncounter covidEncounter = new CovidEncounter();

        covidEncounter.setId( encounterDTO.getId() );
        covidEncounter.setPatientId( encounterDTO.getPatientId() );
        covidEncounter.setVisitDate( encounterDTO.getVisitDate() );
        covidEncounter.setCategory( encounterDTO.getCategory() );
        covidEncounter.setLocation( encounterDTO.getLocation() );
        List<QuestionAnswer> list = encounterDTO.getQuestionAnswers();
        if ( list != null ) {
            covidEncounter.setQuestionAnswers( new ArrayList<QuestionAnswer>( list ) );
        }

        return covidEncounter;
    }

    @Override
    public CovidPatient toPatient(CovidPatientDTO patientDTO) {
        if ( patientDTO == null ) {
            return null;
        }

        CovidPatient covidPatient = new CovidPatient();

        covidPatient.setId( patientDTO.getId() );
        covidPatient.setFirstName( patientDTO.getFirstName() );
        covidPatient.setMidName( patientDTO.getMidName() );
        covidPatient.setLastName( patientDTO.getLastName() );
        covidPatient.setParticipantId( patientDTO.getParticipantId() );
        covidPatient.setGender( patientDTO.getGender() );
        covidPatient.setDob( patientDTO.getDob() );
        covidPatient.setCurrentStatus( patientDTO.getCurrentStatus() );
        covidPatient.setVaccinationStatus( patientDTO.getVaccinationStatus() );
        covidPatient.setAddress( patientDTO.getAddress() );
        covidPatient.setContactPoint( patientDTO.getContactPoint() );

        return covidPatient;
    }

    @Override
    public Question toQuestion(QuestionDTO questionDTO) {
        if ( questionDTO == null ) {
            return null;
        }

        Question question = new Question();

        question.setId( questionDTO.getId() );
        question.setName( questionDTO.getName() );
        question.setCategory( questionDTO.getCategory() );
        question.setDatatype( questionDTO.getDatatype() );
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

        questionAnswer.setId( questionAnswerDTO.getId() );
        questionAnswer.setQuestionId( questionAnswerDTO.getQuestionId() );
        questionAnswer.setAnswer( questionAnswerDTO.getAnswer() );

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
        vaccination.setPatientId( vaccinationEnrollmentDTO.getPatientId() );
        vaccination.setVisitId( vaccinationEnrollmentDTO.getVisitId() );
        vaccination.setVisitDate( vaccinationEnrollmentDTO.getVisitDate() );
        vaccination.setWorkInHealthSector( vaccinationEnrollmentDTO.getWorkInHealthSector() );
        vaccination.setOccupation( vaccinationEnrollmentDTO.getOccupation() );
        vaccination.setKnownMedicalCondition( vaccinationEnrollmentDTO.getKnownMedicalCondition() );
        vaccination.setMedicalCondition( vaccinationEnrollmentDTO.getMedicalCondition() );

        return vaccination;
    }

    @Override
    public VaccinationDose toVaccinationDose(VaccinationDoseDTO vaccinationDoseDTO) {
        if ( vaccinationDoseDTO == null ) {
            return null;
        }

        VaccinationDose vaccinationDose = new VaccinationDose();

        vaccinationDose.setId( vaccinationDoseDTO.getId() );
        vaccinationDose.setPatientId( vaccinationDoseDTO.getPatientId() );
        vaccinationDose.setDoseNumber( vaccinationDoseDTO.getDoseNumber() );
        vaccinationDose.setVaccine( vaccinationDoseDTO.getVaccine() );
        vaccinationDose.setVaccineDate( vaccinationDoseDTO.getVaccineDate() );
        vaccinationDose.setLocation( vaccinationDoseDTO.getLocation() );
        vaccinationDose.setVaccinationFacility( vaccinationDoseDTO.getVaccinationFacility() );
        vaccinationDose.setBatchNumber( vaccinationDoseDTO.getBatchNumber() );
        vaccinationDose.setAdverseEffect( vaccinationDoseDTO.getAdverseEffect() );

        return vaccinationDose;
    }

    @Override
    public CodeSetDTO toCodeSetDto(CodeSet codeSet) {
        if ( codeSet == null ) {
            return null;
        }

        CodeSetDTO codeSetDTO = new CodeSetDTO();

        codeSetDTO.setId( codeSet.getId() );
        codeSetDTO.setName( codeSet.getName() );
        codeSetDTO.setCategory( codeSet.getCategory() );

        return codeSetDTO;
    }

    @Override
    public CovidEncounterDTO toEncounterDto(CovidEncounter encounter) {
        if ( encounter == null ) {
            return null;
        }

        CovidEncounterDTO covidEncounterDTO = new CovidEncounterDTO();

        covidEncounterDTO.setId( encounter.getId() );
        covidEncounterDTO.setPatientId( encounter.getPatientId() );
        covidEncounterDTO.setVisitDate( encounter.getVisitDate() );
        covidEncounterDTO.setCategory( encounter.getCategory() );
        covidEncounterDTO.setLocation( encounter.getLocation() );
        List<QuestionAnswer> list = encounter.getQuestionAnswers();
        if ( list != null ) {
            covidEncounterDTO.setQuestionAnswers( new ArrayList<QuestionAnswer>( list ) );
        }

        return covidEncounterDTO;
    }

    @Override
    public CovidPatientDTO toPatientDto(CovidPatient patient) {
        if ( patient == null ) {
            return null;
        }

        CovidPatientDTO covidPatientDTO = new CovidPatientDTO();

        covidPatientDTO.setId( patient.getId() );
        covidPatientDTO.setFirstName( patient.getFirstName() );
        covidPatientDTO.setMidName( patient.getMidName() );
        covidPatientDTO.setLastName( patient.getLastName() );
        covidPatientDTO.setParticipantId( patient.getParticipantId() );
        covidPatientDTO.setGender( patient.getGender() );
        covidPatientDTO.setDob( patient.getDob() );
        covidPatientDTO.setCurrentStatus( patient.getCurrentStatus() );
        covidPatientDTO.setVaccinationStatus( patient.getVaccinationStatus() );
        covidPatientDTO.setAddress( patient.getAddress() );
        covidPatientDTO.setContactPoint( patient.getContactPoint() );

        return covidPatientDTO;
    }

    @Override
    public QuestionDTO toQuestionDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionDTO questionDTO = new QuestionDTO();

        questionDTO.setId( question.getId() );
        questionDTO.setName( question.getName() );
        questionDTO.setCategory( question.getCategory() );
        questionDTO.setDatatype( question.getDatatype() );
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

        questionAnswerDTO.setId( questionAnswer.getId() );
        questionAnswerDTO.setQuestionId( questionAnswer.getQuestionId() );
        questionAnswerDTO.setAnswer( questionAnswer.getAnswer() );

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
        vaccinationEnrollmentDTO.setPatientId( vaccination.getPatientId() );
        vaccinationEnrollmentDTO.setVisitId( vaccination.getVisitId() );
        vaccinationEnrollmentDTO.setVisitDate( vaccination.getVisitDate() );
        vaccinationEnrollmentDTO.setWorkInHealthSector( vaccination.getWorkInHealthSector() );
        vaccinationEnrollmentDTO.setKnownMedicalCondition( vaccination.getKnownMedicalCondition() );
        vaccinationEnrollmentDTO.setMedicalCondition( vaccination.getMedicalCondition() );
        vaccinationEnrollmentDTO.setOccupation( vaccination.getOccupation() );

        return vaccinationEnrollmentDTO;
    }

    @Override
    public VaccinationDoseDTO toVaccinationDoseDto(VaccinationDose vaccinationDose) {
        if ( vaccinationDose == null ) {
            return null;
        }

        VaccinationDoseDTO vaccinationDoseDTO = new VaccinationDoseDTO();

        vaccinationDoseDTO.setId( vaccinationDose.getId() );
        vaccinationDoseDTO.setPatientId( vaccinationDose.getPatientId() );
        vaccinationDoseDTO.setDoseNumber( vaccinationDose.getDoseNumber() );
        vaccinationDoseDTO.setVaccine( vaccinationDose.getVaccine() );
        vaccinationDoseDTO.setVaccineDate( vaccinationDose.getVaccineDate() );
        vaccinationDoseDTO.setLocation( vaccinationDose.getLocation() );
        vaccinationDoseDTO.setVaccinationFacility( vaccinationDose.getVaccinationFacility() );
        vaccinationDoseDTO.setBatchNumber( vaccinationDose.getBatchNumber() );
        vaccinationDoseDTO.setAdverseEffect( vaccinationDose.getAdverseEffect() );

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
