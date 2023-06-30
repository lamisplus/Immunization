package org.lamisplus.modules.covid.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CovidPatientDTO {
    private Long id;
    private String firstName;
    private String midName;
    private String lastName;
    private String participantId;
    private JsonNode gender;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dob;
    //private String phone;
    private String currentStatus;
    private String vaccinationStatus;
    private JsonNode address;
    private JsonNode contactPoint;
}
