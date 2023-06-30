package org.lamisplus.modules.covid.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "covid_vaccination_dose")
public class VaccinationDose extends CovidAudit<String> {
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
    @Column(name = "dose_number")
    private String doseNumber;
    @Column(name = "vaccine")
    private int vaccine;
    @Column(name = "vaccine_date")
    private LocalDate vaccineDate;
    @Column(name = "location")
    private String location;
    @Column(name = "vaccination_facility")
    private String vaccinationFacility;
    @Column(name = "batch_number")
    private String batchNumber;
    @Column(name = "adverse_effect")
    private String adverseEffect;
    @Column(name = "archived")
    private int archived;
}
