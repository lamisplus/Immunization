package org.lamisplus.modules.covid.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.hpsf.GUID;
import org.lamisplus.modules.base.domain.entities.User;
import org.lamisplus.modules.base.service.UserService;
import org.lamisplus.modules.covid.domain.dto.VaccinationDoseDTO;
import org.lamisplus.modules.covid.domain.entity.CodeSet;
import org.lamisplus.modules.covid.domain.entity.Vaccination;
import org.lamisplus.modules.covid.domain.entity.VaccinationDose;
import org.lamisplus.modules.covid.domain.mapper.CovidMapper;
import org.lamisplus.modules.covid.repository.CodeSetRepository;
import org.lamisplus.modules.covid.repository.VaccinationDoseRepository;
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
public class VaccinationDoseService {
    private final VaccinationDoseRepository repository;
    private final VaccinationRepository vaccinationRepository;
    private final CodeSetRepository codeSetRepository;
    private final CovidMapper mapper;
    private  final UserService userService;
    private final PersonRepository personRepository;

    private Long getCurrentUserOrganization() {
        Optional<User> userWithRoles = userService.getUserWithRoles ();
        return userWithRoles.map (User::getCurrentOrganisationUnitId).orElse (null);
    }
    public VaccinationDoseDTO Save(VaccinationDoseDTO vaccinationDoseDTO){
        //check if vaccine record exist
        List<Vaccination> vaccinations = vaccinationRepository.findVaccinationsByPatientIdOrderByVisitDateDesc(vaccinationDoseDTO.getPatientId());
        Person person = personRepository.findById(vaccinationDoseDTO.getPatientId()).orElse(null);

        if(vaccinations.size()==0){
            Vaccination vaccination = new Vaccination();
            vaccination.setPatientId(person.getId());
            vaccination.setPatientUuid(person.getUuid());
            vaccination.setFacilityId(Math.toIntExact(getCurrentUserOrganization()));
            vaccination.setFacilityUuid(null);
            vaccination.setUuid(UUID.randomUUID().toString());
            vaccinationRepository.save(vaccination);
        }

        VaccinationDose vaccinationDose = mapper.toVaccinationDose(vaccinationDoseDTO);
        vaccinationDose.setPatientUuid(person.getUuid());
        vaccinationDose.setFacilityId(Math.toIntExact(getCurrentUserOrganization()));
        vaccinationDose.setFacilityUuid(null);
        vaccinationDose.setUuid(UUID.randomUUID().toString());
        return mapper.toVaccinationDoseDto(repository.save(vaccinationDose));
    }

    public VaccinationDoseDTO Update(int id, VaccinationDoseDTO vaccinationDoseDTO){
        VaccinationDose vaccinationDose = mapper.toVaccinationDose(vaccinationDoseDTO);
        return mapper.toVaccinationDoseDto(repository.save(vaccinationDose));
    }

    public VaccinationDoseDTO GetVaccinationDoseById(Long id){
        VaccinationDoseDTO vaccinationDoseDTO = mapper.toVaccinationDoseDto(repository.findById(id).orElse(null));
        CodeSet codeSet = codeSetRepository.findById(vaccinationDoseDTO.getVaccine()).orElse(null);
        assert codeSet != null;
        vaccinationDoseDTO.setVaccineName(codeSet.getName());
        return vaccinationDoseDTO;
    }

    public List<VaccinationDoseDTO> GetAllVaccinationDosesByPatientId(Long PatientId) {
        List<VaccinationDoseDTO> vaccinationDoseList =
                mapper.toVaccinationDoseDtoList(repository.findVaccinationDosesByPatientIdOrderByVaccineDateDesc(PatientId));
        for (VaccinationDoseDTO dto:vaccinationDoseList) {
            CodeSet codeSet = codeSetRepository.findById(dto.getVaccine()).orElse(null);
            assert codeSet != null;
            dto.setVaccineName(codeSet.getName());
        }
        return vaccinationDoseList;
    }

    public String Delete(Long id) {
        VaccinationDose vaccinationDose = repository.findById(id).orElse(null);
        assert vaccinationDose != null;
        repository.delete(vaccinationDose);
        return id + " deleted successfully";
    }
}
