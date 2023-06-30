package org.lamisplus.modules.covid.repository;

import org.lamisplus.modules.covid.domain.entity.QuestionAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionAnswerRepository extends JpaRepository<QuestionAnswer, Integer> {
}
