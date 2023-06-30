package org.lamisplus.modules.covid.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.covid.domain.dto.VaccinationDoseDTO;
import org.lamisplus.modules.covid.domain.dto.VaccinationEnrollmentDTO;
import org.lamisplus.modules.covid.service.VaccinationDoseService;
import org.lamisplus.modules.covid.service.VaccinationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/covid")
public class CovidVaccinationController {
    private final VaccinationDoseService service;

    @PostMapping("/vaccinations")
    public VaccinationDoseDTO AddVaccination(@RequestBody VaccinationDoseDTO vaccinationDoseDTO){
        return service.Save(vaccinationDoseDTO);
    }

    @PutMapping("/vaccinations/{id}")
    public VaccinationDoseDTO UpdateVaccination(@PathVariable int id, @RequestBody VaccinationDoseDTO vaccinationDoseDTO){
        return service.Update(id, vaccinationDoseDTO);
    }

    @GetMapping("/vaccinations/patients/{patientId}")
    public List<VaccinationDoseDTO> GetVaccinationsByPatientId(@PathVariable long patientId){
        return service.GetAllVaccinationDosesByPatientId(patientId);
    }

    @GetMapping("/vaccinations/{id}")
    public VaccinationDoseDTO GetVaccinationById(@PathVariable long id){
        return service.GetVaccinationDoseById(id);
    }

    @DeleteMapping("/vaccinations/{id}")
    public String DeleteVaccination(@PathVariable Long id){
        return service.Delete(id);
    }
}
