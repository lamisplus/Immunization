package org.lamisplus.modules.covid.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.base.domain.dto.PageDTO;
import org.lamisplus.modules.base.domain.entities.User;
import org.lamisplus.modules.base.service.UserService;
import org.lamisplus.modules.covid.domain.dto.CovidPatientDTO;
import org.lamisplus.modules.covid.domain.dto.CovidPatientMetaDataDTO;
import org.lamisplus.modules.covid.domain.entity.VaccinationDose;
import org.lamisplus.modules.covid.domain.mapper.CovidMapper;
import org.lamisplus.modules.covid.repository.EncounterRepository;
import org.lamisplus.modules.covid.repository.CovidPatientRepository;
import org.lamisplus.modules.covid.repository.VaccinationDoseRepository;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.lamisplus.modules.patient.service.PersonService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CovidPatientService {
    private final CovidPatientRepository repository;
    private final EncounterRepository encounterRepository;
    private final CovidMapper mapper;
    private final CovidPatientRepository covidPatientRepository;
    private final VaccinationDoseRepository vaccinationDoseRepository;
    private  final UserService userService;

    /*
    public CovidPatientDTO SavePatient(CovidPatientDTO patientDTO){
        CovidPatient patient = mapper.toPatient(patientDTO);
        return mapper.toPatientDto(repository.save(SetVaccinationStatus(patient)));
    }

    public CovidPatientDTO UpdatePatient(int id, CovidPatientDTO patientDTO){
        CovidPatient patient = mapper.toPatient(patientDTO);
        return mapper.toPatientDto(repository.save(SetVaccinationStatus(patient)));
    }

    public List<CovidPatientDTO> GetAllPatients() {
        List<CovidPatient> patients = repository.findAll();
        List<CovidPatient> patientsWithStatus = new ArrayList<>();
        for(CovidPatient patient : patients){
            patientsWithStatus.add(SetVaccinationStatus(patient));
        }
        return mapper.toPatientDtoList(patientsWithStatus);
    }

    public String DeletePatient(int id) {
        CovidPatient patient = repository.findById(id).orElse(null);
        repository.delete(patient);
        return id+" deleted successfully";
    }

    public CovidPatient SetVaccinationStatus(CovidPatient patient){
        List<CovidEncounter> encounters = encounterRepository.findEncountersByPatientIdAndCategory(patient.getId(), "VACCINATION");

        String vaccinationStatus = "";

        if(encounters.size()==0){
            vaccinationStatus = "Not Vaccinated"; //1
        }
        else if(encounters.size()==1)
        {
            vaccinationStatus = "Partially Vaccinated"; //2
        }
        else{
            vaccinationStatus = "Fully Vaccinated"; //3
        }
        patient.setVaccinationStatus(vaccinationStatus);
        return patient;
    }

    public CovidPatientStatusDTO SaveStatus(CovidPatientStatusDTO patientStatusDTO){
        CovidPatient patient = repository.findById(patientStatusDTO.getPatientId()).orElse(null);
        patient.setCurrentStatus(patientStatusDTO.getCurrentStatus());
        return patientStatusDTO;
    }

    public CovidPatientStatusDTO UpdateStatus(CovidPatientStatusDTO patientStatusDTO){
        CovidPatient patient = repository.findById(patientStatusDTO.getPatientId()).orElse(null);
        patient.setCurrentStatus(patientStatusDTO.getCurrentStatus());
        return patientStatusDTO;
    }

    public CovidPatientStatusDTO GetStatusByPatientId(int patientId) {
        CovidPatient patient = repository.findById(patientId).orElse(null);
        CovidPatientStatusDTO patientStatusDTO = new CovidPatientStatusDTO();
        patientStatusDTO.setId(1);
        patientStatusDTO.setPatientId(patientId);
        patientStatusDTO.setCurrentStatus(patient.getCurrentStatus());
        return patientStatusDTO;
    }

    public String DeleteStatus(int patientId) {
        CovidPatient patient = repository.findById(patientId).orElse(null);
        patient.setCurrentStatus("");
        return patientId + " status deleted successfully";
    }
     */

    private Long getCurrentUserOrganization() {
        Optional<User> userWithRoles = userService.getUserWithRoles ();
        return userWithRoles.map (User::getCurrentOrganisationUnitId).orElse (null);
    }

    public CovidPatientMetaDataDTO GetPatients(int pageNo, int pageSize, String searchParam, Boolean vaccinated){
        CovidPatientMetaDataDTO patientMetaDataDTO = new CovidPatientMetaDataDTO();
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Page<Person> patients = null;
        List<CovidPatientDTO> covidPatients = new ArrayList<>();

        if(vaccinated) {
            if (Objects.equals(searchParam, "") || Objects.equals(searchParam, "*")) {
                patients = covidPatientRepository.getAllCovidByArchivedAndFacilityIdOrderByIdDesc(0, getCurrentUserOrganization(), paging);
            } else {
                patients = covidPatientRepository.findAllCovidPersonBySearchParameters(searchParam, 0, getCurrentUserOrganization(), paging);
            }
        }
        else {
            if (Objects.equals(searchParam, "") || Objects.equals(searchParam, "*")) {
                patients = covidPatientRepository.getAllByArchivedAndFacilityIdOrderByIdDesc(0, getCurrentUserOrganization(), paging);
            } else {
                patients = covidPatientRepository.findAllPersonBySearchParameters(searchParam, 0, getCurrentUserOrganization(), paging);
            }
        }

        List<Person> personList= patients.getContent();

        for(Person person:personList){
            CovidPatientDTO dto=new CovidPatientDTO();
            dto.setId(person.getId());
            dto.setDob(person.getDateOfBirth());
            dto.setFirstName(person.getFirstName());
            dto.setMidName(person.getOtherName());
            dto.setLastName(person.getSurname());
            dto.setVaccinationStatus(GetVaccinationStatus(person.getId()));
            dto.setGender(person.getGender());
            dto.setParticipantId(person.getHospitalNumber());
            dto.setAddress(person.getAddress());
            dto.setContactPoint(person.getContactPoint());

            covidPatients.add(dto);
        }

        if (patients.hasContent()) {
            PageDTO pageDTO = this.generatePagination(patients);
            patientMetaDataDTO.setTotalRecords(pageDTO.getTotalRecords());
            patientMetaDataDTO.setPageSize(pageDTO.getPageSize());
            patientMetaDataDTO.setTotalPages(pageDTO.getTotalPages());
            patientMetaDataDTO.setCurrentPage(pageDTO.getPageNumber());
            patientMetaDataDTO.setRecords(covidPatients);
            return patientMetaDataDTO;
        }

        CovidPatientMetaDataDTO patientMetaDataDTO1 = new CovidPatientMetaDataDTO();
        patientMetaDataDTO1.setCurrentPage(0);
        patientMetaDataDTO1.setPageSize(10);
        patientMetaDataDTO1.setTotalRecords(0);
        patientMetaDataDTO1.setTotalPages(0);
        patientMetaDataDTO1.setRecords(Collections.emptyList());
        return patientMetaDataDTO1;
    }

    private String GetVaccinationStatus(Long patientId){
        List<VaccinationDose>  doses = vaccinationDoseRepository.findVaccinationDosesByPatientIdOrderByVaccineDateDesc(patientId);

        if(doses.size()==0)
        {
            return "Not Vaccinated";
        }
        else
        {
            return "Vaccinated";
        }
    }

    public PageDTO generatePagination(Page page) {
        long totalRecords = page.getTotalElements();
        int pageNumber = page.getNumber();
        int pageSize = page.getSize();
        int totalPages = page.getTotalPages();
        return PageDTO.builder().totalRecords(totalRecords)
                .pageNumber(pageNumber)
                .pageSize(pageSize)
                .totalPages(totalPages).build();
    }
}
