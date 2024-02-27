package org.lamisplus.modules.covid.domain.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.Type;
import org.lamisplus.modules.covid.domain.entity.Immunization;
//import org.lamisplus.modules.covid.domain.entity.RoutineImmunization;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
