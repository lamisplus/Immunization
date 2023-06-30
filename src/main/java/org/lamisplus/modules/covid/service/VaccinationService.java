package org.lamisplus.modules.covid.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.domain.entities.User;
import org.lamisplus.modules.base.service.UserService;
import org.lamisplus.modules.covid.domain.dto.VaccinationEnrollmentDTO;
import org.lamisplus.modules.covid.domain.entity.Vaccination;
import org.lamisplus.modules.covid.domain.mapper.CovidMapper;
import org.lamisplus.modules.covid.repository.VaccinationRepository;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VaccinationService {
    private final VaccinationRepository repository;
    private final CovidMapper mapper;
    private  final UserService userService;
    private final PersonRepository personRepository;

    private Long getCurrentUserOrganization() {
        Optional<User> userWithRoles = userService.getUserWithRoles ();
        return userWithRoles.map (User::getCurrentOrganisationUnitId).orElse (null);
    }
    public VaccinationEnrollmentDTO Save(VaccinationEnrollmentDTO vaccinationEnrollmentDTO){
        Vaccination vaccination = mapper.toVaccination(vaccinationEnrollmentDTO);
        Person person = personRepository.findById(vaccination.getPatientId()).orElse(null);
        vaccination.setPatientUuid(person.getUuid());
        vaccination.setFacilityId(Math.toIntExact(getCurrentUserOrganization()));
        vaccination.setFacilityUuid(null);
        vaccination.setUuid(UUID.randomUUID().toString());
        return mapper.toVaccinationDto(repository.save(vaccination));
    }

    public VaccinationEnrollmentDTO Update(int id, VaccinationEnrollmentDTO vaccinationEnrollmentDTO){
        Vaccination vaccination = mapper.toVaccination(vaccinationEnrollmentDTO);
        return mapper.toVaccinationDto(repository.save(vaccination));
    }

    public VaccinationEnrollmentDTO GetVaccinationById(Long id){
        return mapper.toVaccinationDto(repository.findById(id).orElse(null));
    }

    public List<VaccinationEnrollmentDTO> GetAllVaccinationsByPatientId(Long patientId) {
        return mapper.toVaccinationDtoList(repository.findVaccinationsByPatientIdOrderByVisitDateDesc(patientId));
    }

    public String Delete(long id) {
        Vaccination vaccination = repository.findById(id).orElse(null);
        assert vaccination != null;
        repository.delete(vaccination);
        return id + " deleted successfully";
    }
}
