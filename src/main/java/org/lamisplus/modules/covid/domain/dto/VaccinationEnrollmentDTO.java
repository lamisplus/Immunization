package org.lamisplus.modules.covid.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class VaccinationEnrollmentDTO {
    private long id;
    private long patientId;
    private Long visitId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime visitDate;
    private Boolean workInHealthSector;
    private Boolean knownMedicalCondition;
    private String medicalCondition;
    private int occupation;

    private int vaccine;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate vaccineDate;
    private String location;
    private String vaccinationFacility;
    private String batchNumber;
    private String adverseEffect;
}
