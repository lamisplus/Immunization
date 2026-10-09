package org.lamisplus.modules.immunization.repository;

import org.lamisplus.modules.immunization.domain.entity.Immunization;
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

    // Paged native queries carry an explicit countQuery and a total order
    // (date, then id) so pages never overlap or skip rows.
    @Query(nativeQuery = true, value = "SELECT * FROM " +
            "immunization WHERE patient_id = :patientId " +
            "AND archived = :archived " +
            "ORDER BY vaccination_date DESC, id DESC",
            countQuery = "SELECT COUNT(*) FROM immunization " +
                    "WHERE patient_id = :patientId AND archived = :archived")
    Page<Immunization> getPagedByPatientIdAndArchived(
            @Param("patientId") Long patientId,
            @Param("archived") int archived,
            Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT * FROM " +
            "immunization WHERE archived = 0 " +
            "ORDER BY vaccination_date DESC, id DESC",
            countQuery = "SELECT COUNT(*) FROM immunization WHERE archived = 0")
    Page<Immunization> getAllPaged(Pageable pageable);

    // Matches the patient snapshot saved with each record (the data the
    // vaccinated-patients list displays): name parts or any identifier value.
    String PATIENT_SEARCH_CONDITION = "(:search = '' " +
            "OR concat_ws(' ', i.unique_immunization_data -> 'patientDto' ->> 'firstName', " +
            "i.unique_immunization_data -> 'patientDto' ->> 'otherName', " +
            "i.unique_immunization_data -> 'patientDto' ->> 'surname') ILIKE :pattern " +
            "OR i.unique_immunization_data -> 'patientDto' ->> 'participantId' ILIKE :pattern " +
            "OR EXISTS (SELECT 1 FROM jsonb_array_elements(" +
            "CASE WHEN jsonb_typeof(i.unique_immunization_data -> 'patientDto' -> 'identifier' -> 'identifier') = 'array' " +
            "THEN i.unique_immunization_data -> 'patientDto' -> 'identifier' -> 'identifier' " +
            "ELSE CAST('[]' AS jsonb) END) AS ident WHERE ident ->> 'value' ILIKE :pattern))";

    // One row per vaccinated patient: their most recent active record.
    @Query(nativeQuery = true, value = "SELECT * FROM (" +
            "SELECT DISTINCT ON (i.patient_id) i.* FROM immunization i " +
            "WHERE i.archived = 0 AND i.patient_id IS NOT NULL AND " + PATIENT_SEARCH_CONDITION + " " +
            "ORDER BY i.patient_id, i.vaccination_date DESC, i.id DESC" +
            ") latest ORDER BY latest.vaccination_date DESC, latest.id DESC",
            countQuery = "SELECT COUNT(DISTINCT i.patient_id) FROM immunization i " +
                    "WHERE i.archived = 0 AND i.patient_id IS NOT NULL AND " + PATIENT_SEARCH_CONDITION)
    Page<Immunization> getLatestPerPatient(
            @Param("search") String search,
            @Param("pattern") String pattern,
            Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT EXISTS (SELECT 1 FROM patient_person p " +
            "WHERE p.id = :patientId AND CAST(p.uuid AS text) = :patientUuid " +
            "AND (p.archived IS NULL OR p.archived = 0))")
    boolean activePatientExists(
            @Param("patientId") Long patientId,
            @Param("patientUuid") String patientUuid);
}
