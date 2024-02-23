package org.lamisplus.modules.covid.repository;

import org.lamisplus.modules.covid.domain.entity.Immunization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImmunizationRepository extends JpaRepository<Immunization, Long> {
    Optional<Immunization> findByIdAndAndArchived(Long id, int archived);

    @Query(nativeQuery = true, value = "SELECT * FROM " +
            "immunization WHERE patient_id =:patientId " +
            "AND archived = :archived " +
            "ORDER BY vaccination_date DESC")
    Page<Immunization> getPagedByPatientIdAndArchived(
            @Param("patientId") Long patientId,
            @Param("archived") int archived,
            Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT * FROM immunization")
    Page<Immunization> getAllPaged(Pageable pageable);
}
