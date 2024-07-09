package org.lamisplus.modules.immunization.domain.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.Type;
import org.lamisplus.modules.immunization.domain.entity.Immunization;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
public class ImmunizationDTO implements Serializable {
    private Long id;
    private Long patientId;
    private UUID patientUuid;
    private String immunizationType;
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
