package org.lamisplus.modules.covid.repository;

import org.lamisplus.modules.covid.domain.entity.QuestionResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionResponseRepository extends JpaRepository<QuestionResponse, Integer> {
}
