package org.lamisplus.modules.covid.repository;

import org.lamisplus.modules.covid.domain.entity.CodeSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CodeSetRepository extends JpaRepository<CodeSet, Integer> {
    List<CodeSet> findAllByCategory(String category);
}
