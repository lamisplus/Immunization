package org.lamisplus.modules.covid.domain.entity;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "routine_immunization")
public class RoutineImmunizationForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "patient_id", nullable = false)
    private int patientId;

    @Column(name = "vaccine_type", nullable = false)
    private String vaccineType;

    @Column(name = "vaccine_detail", nullable = false)
    private String vaccineDetail;

    @Column(name = "vaccine_id", nullable = false)
    private int vaccineId;

    @Column(name = "missed_vaccine", nullable = false)
    private String missedVaccine;

    @Column(name = "missed_vaccine_type", nullable=false)
    private String missedVaccineType;

    @Column(name = "archived")
    private int archived;

    @Column(name = "vaccination_date", nullable=false)
    private LocalDate vaccinationDate;

    @Column(name = "patient_uuid", nullable=false)
    private int patientUuid;


}