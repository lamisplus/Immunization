package org.lamisplus.modules.covid.repository;

import org.lamisplus.modules.covid.domain.entity.Vaccination;
import org.lamisplus.modules.covid.domain.entity.VaccinationDose;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VaccinationDoseRepository extends JpaRepository<VaccinationDose, Long> {
    List<VaccinationDose> findVaccinationDosesByPatientIdOrderByVaccineDateDesc(long patientId);
}
