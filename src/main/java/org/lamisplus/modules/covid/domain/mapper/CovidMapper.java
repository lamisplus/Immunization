package org.lamisplus.modules.covid.domain.mapper;

import org.lamisplus.modules.covid.domain.dto.*;
import org.lamisplus.modules.covid.domain.entity.*;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CovidMapper {
    CodeSet toCodeSet(CodeSetDTO codeSetDTO);
    CovidEncounter toEncounter(CovidEncounterDTO encounterDTO);
    CovidPatient toPatient(CovidPatientDTO patientDTO);
    Question toQuestion(QuestionDTO questionDTO);
    QuestionAnswer toQuestionAnswer(QuestionAnswerDTO questionAnswerDTO);
    QuestionResponse toQuestionResponse(QuestionResponseDTO questionResponseDTO);
    Vaccination toVaccination(VaccinationEnrollmentDTO vaccinationEnrollmentDTO);
    VaccinationDose toVaccinationDose(VaccinationDoseDTO vaccinationDoseDTO);

    CodeSetDTO toCodeSetDto(CodeSet codeSet);
    CovidEncounterDTO toEncounterDto(CovidEncounter encounter);
    CovidPatientDTO toPatientDto(CovidPatient patient);
    QuestionDTO toQuestionDto(Question question);
    QuestionAnswerDTO toQuestionAnswerDto(QuestionAnswer questionAnswer);
    QuestionResponseDTO toQuestionResponseDto(QuestionResponse questionResponse);
    VaccinationEnrollmentDTO toVaccinationDto(Vaccination vaccination);
    VaccinationDoseDTO toVaccinationDoseDto(VaccinationDose vaccinationDose);


    List<CodeSetDTO> toCodeSetDtoList(List<CodeSet> codeSets);
    List<CovidEncounterDTO> toEncounterDtoList(List<CovidEncounter> encounters);
    List<CovidPatientDTO> toPatientDtoList(List<CovidPatient> patients);
    List<QuestionDTO> toQuestionDtoList(List<Question> questions);
    List<QuestionAnswerDTO> toQuestionAnswerDtoList(List<QuestionAnswer> questionAnswers);
    List<QuestionResponseDTO> toQuestionResponseDtoList(List<QuestionResponse> questionResponses);
    List<VaccinationEnrollmentDTO> toVaccinationDtoList(List<Vaccination> vaccinationList);
    List<VaccinationDoseDTO> toVaccinationDoseDtoList(List<VaccinationDose> vaccinationDoseList);
}
