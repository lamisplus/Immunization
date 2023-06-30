package org.lamisplus.modules.covid.domain.dto;

import lombok.Data;
import org.lamisplus.modules.patient.domain.dto.PersonDto;

@Data
public class CovidPatientEnrollmentDTO {
    private PersonDto person;
    private VaccinationEnrollmentDTO vaccinationEnrollment;
}
