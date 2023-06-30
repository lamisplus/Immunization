package org.lamisplus.modules.covid.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "covid_question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "uuid")
    private String uuid;
    @Column(name = "name")
    private String name;
    @Column(name = "category")
    private String category;
    @Column(name = "datatype")
    private String datatype;

    @JoinColumn(name = "questionId")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionResponse> responses;
}