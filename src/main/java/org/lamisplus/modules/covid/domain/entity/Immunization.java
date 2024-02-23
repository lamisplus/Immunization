package org.lamisplus.modules.covid.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lamisplus.modules.covid.domain.ExtraDataConverter;
import org.lamisplus.modules.covid.domain.dto.ImmunizationDTO;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "immunization")
@Builder
public class Immunization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "patient_id", nullable = false)
    private Long patientId;
    @Column(name = "patient_uuid", nullable=false)
    private UUID patientUuid;
    @Column(name = "immunization_type", nullable=false)
    private String immunizationType;
    @Column(name = "vaccination_date", nullable=false)
    private LocalDate vaccinationDate;
    @Column(name = "unique_immunization_data", columnDefinition = "jsonb")
    @Convert(converter = ExtraDataConverter.class)
    private Map<String, String> uniqueImmunizationData;
    @Column(name = "archived", columnDefinition = "INTEGER DEFAULT 0")
    private int archived;

    public static Immunization createFromDto(ImmunizationDTO immunizationDTO){
        return Immunization.builder()
                .id(immunizationDTO.getId())
                .patientId(immunizationDTO.getPatientId())
                .patientUuid(immunizationDTO.getPatientUuid())
                .immunizationType(immunizationDTO.getImmunizationType())
                .vaccinationDate(immunizationDTO.getVaccinationDate())
                .uniqueImmunizationData(immunizationDTO.getUniqueImmunizationData())
                .archived(immunizationDTO.getArchived())
                .build();
    }
}
