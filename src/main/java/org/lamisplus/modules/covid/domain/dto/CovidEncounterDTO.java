package org.lamisplus.modules.covid.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.lamisplus.modules.covid.domain.entity.QuestionAnswer;

import java.time.LocalDate;
import java.util.List;

@Data
public class CovidEncounterDTO {
    private int id;
    private int patientId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate visitDate;
    private String category;
    private String location;
    private List<QuestionAnswer> questionAnswers;
}
