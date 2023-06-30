package org.lamisplus.modules.covid.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.covid.domain.dto.CovidPatientMetaDataDTO;
import org.lamisplus.modules.covid.service.CovidPatientService;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/covid")
public class CovidPatientController {
    private final CovidPatientService service;

    /*
    @PostMapping("/patients")
    public CovidPatientDTO AddPatient(@RequestBody CovidPatientDTO patient){
        return service.SavePatient(patient);
    }

    @PutMapping("/patients/{id}")
    public CovidPatientDTO UpdatePatient(@PathVariable int id, @RequestBody CovidPatientDTO patient){
        return service.UpdatePatient(id, patient);
    }

    @GetMapping("/patients")
    public List<CovidPatientDTO> GetPatients(){
        return service.GetAllPatients();
    }

    @DeleteMapping("/patients/{id}")
    public String DeletePatient(@PathVariable Integer id){
        return service.DeletePatient(id);
    }

    @PostMapping("/patientstatus")
    public CovidPatientStatusDTO SaveCurrentStatus(@RequestBody CovidPatientStatusDTO patientStatus){
        return service.SaveStatus(patientStatus);
    }

    @GetMapping("/patientstatus/{patient_id}")
    public CovidPatientStatusDTO GetCurrentStatus(@PathVariable Integer patient_id){
        return service.GetStatusByPatientId(patient_id);
    }

    @DeleteMapping("/patientstatus/{patient_id}")
    public String DeleteCurrentStatus(@PathVariable Integer patient_id){
        return service.DeleteStatus(patient_id);
    }
     */

    @GetMapping("/all-patients")
    public CovidPatientMetaDataDTO GetAllPatients(@RequestParam(defaultValue = "0") int pageNo,
                                                  @RequestParam(defaultValue = "10") int pageSize,
                                                  @RequestParam(defaultValue = "*") String searchParam){
        return service.GetPatients(pageNo, pageSize, searchParam, false);
    }

    @GetMapping("/vaccinated-patients")
    public CovidPatientMetaDataDTO GetVaccinatedPatients(@RequestParam(defaultValue = "0") int pageNo,
                                                         @RequestParam(defaultValue = "10") int pageSize,
                                                         @RequestParam(defaultValue = "*") String searchParam){
        return service.GetPatients(pageNo, pageSize, searchParam, true);
    }
}
