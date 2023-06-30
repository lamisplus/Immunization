package org.lamisplus.modules.covid.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "covid_vaccination")
public class Vaccination extends CovidAudit<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "uuid")
    private String uuid;
    @Column(name = "patient_id")
    private long patientId;
    @Column(name = "patient_uuid")
    private String patientUuid;
    @Column(name = "facility_id")
    private int facilityId;
    @Column(name = "facility_uuid")
    private String facilityUuid;
    @Column(name = "visit_id")
    private Long visitId;
    @Column(name = "visit_date")
    private LocalDateTime visitDate;
    @Column(name = "work_in_health_sector")
    private Boolean workInHealthSector;
    @Column(name = "occupation")
    private int occupation;
    @Column(name = "known_medical_condition")
    private Boolean knownMedicalCondition;
    @Column(name = "medical_condition")
    private String medicalCondition;
    @Column(name = "vaccine_id")
    private String vaccineId;
    @Column(name = "archived")
    private int archived;
}
