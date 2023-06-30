package org.lamisplus.modules.covid.domain.dto;

import lombok.Data;

@Data
public class CovidPatientStatusDTO {
    private int id;
    private int patientId;
    private String currentStatus;
}
