//package org.lamisplus.modules.covid.domain.entity;
//
//import lombok.*;
//import javax.persistence.*;
//
//@Entity
//@AllArgsConstructor
//@NoArgsConstructor
//@Data
//@Table(name = "routine_immunization")
//public class RoutineImmunization {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//    private int immunizationId;
//
//    @Column(name = "vaccine_code", nullable = false)
//    private String vaccineCode;
//
//    @Column(name = "description", nullable = false)
//    private String description;
//
//    @Column(name = "missed_vaccine", nullable = false)
//    private boolean missedVaccine;
//
//    @Column(name = "missed_vaccine_code", nullable=false)
//    private String missedVaccineCode;
//
//}