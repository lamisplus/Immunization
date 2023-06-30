package org.lamisplus.modules.covid.domain.dto;

import lombok.Data;
import org.lamisplus.modules.covid.domain.entity.QuestionResponse;

import java.util.List;

@Data
public class QuestionDTO {
    private int id;
    private String name;
    private String category;
    private String datatype;
    private List<QuestionResponse> responses;
}
