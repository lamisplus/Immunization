package org.lamisplus.modules.covid.repository;

import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CovidPatientRepository extends JpaRepository<Person, Integer> {
    @Query(
            value = "SELECT a.* FROM patient_person a left join covid_vaccination b on a.id = b.patient_id " +
                    "WHERE (b.patient_id is null and a.first_name ilike ?1 OR a.surname ilike ?1 OR a.other_name ilike ?1 OR a.full_name ilike ?1 OR a.hospital_number ilike ?1)  AND a.archived=?2 AND a.facility_id=?3",
            nativeQuery = true
    )
    Page<Person> findAllPersonBySearchParameters(String queryParam, Integer archived, Long facilityId, Pageable pageable);

    @Query(
            value = "SELECT p.*, CAST (EXTRACT(YEAR from AGE(NOW(),  date_of_birth)) AS INTEGER) as age, INITCAP(p.sex) as gender, p.date_of_birth as dateOfBirth " +
                    "FROM patient_person p left join covid_vaccination b on p.id = b.patient_id " +
                    "WHERE b.patient_id is null and p.archived=?1 AND p.facility_id=?2 GROUP BY p.id, p.first_name, p.surname, p.other_name, p.hospital_number, p.date_of_birth",
            nativeQuery = true
    )
    Page<Person> getAllByArchivedAndFacilityIdOrderByIdDesc(Integer archived, Long facilityId, Pageable pageable);

    @Query(
            value = "SELECT a.* FROM patient_person a inner join covid_vaccination b on a.id = b.patient_id " +
                    "WHERE (a.first_name ilike ?1 OR a.surname ilike ?1 OR a.other_name ilike ?1 OR a.full_name ilike ?1 OR a.hospital_number ilike ?1)  AND a.archived=?2 AND a.facility_id=?3",
            nativeQuery = true
    )
    Page<Person> findAllCovidPersonBySearchParameters(String queryParam, Integer archived, Long facilityId, Pageable pageable);

    @Query(
            value = "SELECT p.*, CAST (EXTRACT(YEAR from AGE(NOW(),  date_of_birth)) AS INTEGER) as age, INITCAP(p.sex) as gender, p.date_of_birth as dateOfBirth " +
                    "FROM patient_person p inner join covid_vaccination b on p.id = b.patient_id " +
                    "WHERE p.archived=?1 AND p.facility_id=?2 GROUP BY p.id, p.first_name, p.surname, p.other_name, p.hospital_number, p.date_of_birth",
            nativeQuery = true
    )
    Page<Person> getAllCovidByArchivedAndFacilityIdOrderByIdDesc(Integer archived, Long facilityId, Pageable pageable);
}
