package org.lamisplus.modules.covid.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "covid_encounter")
public class CovidEncounter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "uuid")
    private String uuid;
    @Column(name = "patient_id")
    private int patientId;
    @Column(name = "visit_date")
    private LocalDate visitDate;
    @Column(name = "category")
    private String category;
    @Column(name = "location")
    private String location;

    @JoinColumn(name = "encounterId")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionAnswer> questionAnswers;
}
