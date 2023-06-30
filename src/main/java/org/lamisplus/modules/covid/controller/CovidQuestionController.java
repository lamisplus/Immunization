package org.lamisplus.modules.covid.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.covid.domain.dto.QuestionDTO;
import org.lamisplus.modules.covid.domain.entity.Question;
import org.lamisplus.modules.covid.service.QuestionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/covid")
public class CovidQuestionController {
    private final QuestionService service;

    @GetMapping("/questions-by-category/{category}")
    public List<QuestionDTO> getQuestionsByCategory(@PathVariable String category){
        return service.GetQuestionsByCategory(category);
    }
}
