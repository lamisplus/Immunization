package org.lamisplus.modules.covid.domain.dto;

import lombok.Data;


@Data
public class QuestionAnswerDTO {
    private int id;
    private int questionId;
    private String answer;
}
