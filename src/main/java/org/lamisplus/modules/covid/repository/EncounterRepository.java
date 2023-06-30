package org.lamisplus.modules.covid.repository;

import org.lamisplus.modules.covid.domain.entity.CovidEncounter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface EncounterRepository extends JpaRepository<CovidEncounter, Integer> {
    List<CovidEncounter> findEncountersByPatientIdAndCategory(Long patientId, String category);
}
