package org.lamisplus.modules.covid.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.base.service.UserService;
import org.lamisplus.modules.covid.domain.dto.*;
import org.lamisplus.modules.covid.domain.entity.Vaccination;
import org.lamisplus.modules.covid.domain.mapper.CovidMapper;
import org.lamisplus.modules.covid.repository.CovidPatientRepository;
import org.lamisplus.modules.covid.repository.VaccinationDoseRepository;
import org.lamisplus.modules.covid.repository.VaccinationRepository;
import org.lamisplus.modules.patient.domain.dto.PersonDto;
import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CovidEnrollmentService {
    private final PersonService personService;
    private final PersonRepository personRepository;
    private final CovidPatientRepository covidPatientRepository;
    private final VaccinationService vaccinationService;
    private final VaccinationDoseService vaccinationDoseService;
    private final VaccinationRepository vaccinationRepository;
    private final VaccinationDoseRepository vaccinationDoseRepository;
    private  final UserService userService;
    private final CovidMapper mapper;

    public CovidPatientEnrollmentDTO SavePatientEnrollment(CovidPatientEnrollmentDTO enrollmentDTO){
        Long patientId = SavePatient(enrollmentDTO.getPerson(), enrollmentDTO.getPerson().getId());
        VaccinationEnrollmentDTO enrollment = enrollmentDTO.getVaccinationEnrollment();
        enrollment.setPatientId(patientId);

        VaccinationEnrollmentDTO vaccinationEnrollment = SaveVaccinationEnrollment(enrollment);
        enrollmentDTO.setVaccinationEnrollment(vaccinationEnrollment);
        return enrollmentDTO;
    }

    private Long SavePatient(PersonDto personDto, Long personId) {
        if (personId == null) {
            PersonResponseDto person = personService.createPerson(personDto);
            return person.getId();
        } else {
            return personId;
        }
    }

    private VaccinationEnrollmentDTO SaveVaccinationEnrollment(VaccinationEnrollmentDTO enrollmentDTO){
        VaccinationDoseDTO dose= new VaccinationDoseDTO();
        dose.setVaccine(enrollmentDTO.getVaccine());
        dose.setDoseNumber("1");
        dose.setAdverseEffect(enrollmentDTO.getAdverseEffect());
        dose.setBatchNumber(enrollmentDTO.getBatchNumber());
        dose.setLocation(enrollmentDTO.getLocation());
        dose.setPatientId(enrollmentDTO.getPatientId());
        dose.setVaccineDate(enrollmentDTO.getVaccineDate());
        dose.setVaccinationFacility(enrollmentDTO.getVaccinationFacility());
        vaccinationDoseService.Save(dose);
        return vaccinationService.Save(enrollmentDTO);
    }

    public String Delete(Long patientId){
        //TODO: archive enrollment record
        return "deleted";
    }

    public CovidPatientEnrollmentResponseDTO GetEnrollmentByPatientId(Long patientId){
        CovidPatientEnrollmentResponseDTO enrollmentDTO = new CovidPatientEnrollmentResponseDTO();
        PersonResponseDto person = personService.getPersonById(patientId);
        Vaccination vaccination = vaccinationRepository.findVaccinationsByPatientIdOrderByVisitDateDesc(patientId).get(0);
        enrollmentDTO.setVaccinationEnrollment(mapper.toVaccinationDto(vaccination));
        enrollmentDTO.setPerson(person);
        return enrollmentDTO;
    }
}
