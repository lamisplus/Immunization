package org.lamisplus.modules.covid.repository;

import org.lamisplus.modules.covid.domain.entity.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VaccinationRepository extends JpaRepository<Vaccination, Long> {
    List<Vaccination> findVaccinationsByPatientIdOrderByVisitDateDesc(long patientId);
}
