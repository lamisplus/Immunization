package org.lamisplus.modules.immunization.domain.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.lamisplus.modules.immunization.domain.entity.Immunization;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImmunizationDTO implements Serializable {
    public static final String IMMUNIZATION_TYPES =
            "ROUTINE_IMMUNIZATION|TETANUS_IMMUNIZATION|COVID_IMMUNIZATION";

    private Long id;
    @NotNull(message = "patientId is required")
    private Long patientId;
    @NotNull(message = "patientUuid is required")
    private UUID patientUuid;
    @NotNull(message = "immunizationType is required")
    @Pattern(regexp = IMMUNIZATION_TYPES,
            message = "immunizationType must be one of ROUTINE_IMMUNIZATION, TETANUS_IMMUNIZATION, COVID_IMMUNIZATION")
    private String immunizationType;
    @NotNull(message = "vaccinationDate is required")
    @PastOrPresent(message = "vaccinationDate cannot be in the future")
    private LocalDate vaccinationDate;
//    private Map<String, String> uniqueImmunizationData;
    @Type(type = "jsonb")
    private JsonNode uniqueImmunizationData;
    private int archived;


    public static ImmunizationDTO createFromEntity(Immunization immunization){
        return ImmunizationDTO.builder()
                .id(immunization.getId())
                .patientId(immunization.getPatientId())
                .patientUuid(immunization.getPatientUuid())
                .immunizationType(immunization.getImmunizationType())
                .vaccinationDate(immunization.getVaccinationDate())
                .uniqueImmunizationData(immunization.getUniqueImmunizationData())
                .archived(immunization.getArchived())
                .build();
    }

}
