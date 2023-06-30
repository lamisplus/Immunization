package org.lamisplus.modules.covid.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class VaccinationDoseDTO {
    private long id;
    private long patientId;
    private String doseNumber;
    private int vaccine;
    private String vaccineName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate vaccineDate;
    private String location;
    private String vaccinationFacility;
    private String batchNumber;
    private String adverseEffect;
}
