package org.lamisplus.modules.covid.domain.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RoutineImmunizationFormDTO {
    private int id;
    private int patientId;
    private String vaccineType;
    private String vaccineDetail;
    private int vaccineId;
    private String missedVaccine;
    private String missedVaccineType;
    private int archived;
    private LocalDate vaccinationDate;
    private int patientUuid;


}
