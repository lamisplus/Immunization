package org.lamisplus.modules.covid.domain.dto;

import lombok.Data;
import org.lamisplus.modules.patient.domain.dto.PersonDto;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;

@Data
public class CovidPatientEnrollmentResponseDTO {
    private PersonResponseDto person;
    private VaccinationEnrollmentDTO vaccinationEnrollment;
}
