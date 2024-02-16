package org.lamisplus.modules.covid.repository;

import org.lamisplus.modules.covid.domain.entity.RoutineImmunizationForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoutineImmunizationFormRepository extends JpaRepository<RoutineImmunizationForm, Integer> {
}
