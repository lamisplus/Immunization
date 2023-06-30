package org.lamisplus.modules.covid.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.covid.domain.dto.CovidPatientEnrollmentDTO;
import org.lamisplus.modules.covid.domain.dto.CovidPatientEnrollmentResponseDTO;
import org.lamisplus.modules.covid.service.CovidEnrollmentService;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/covid")
public class CovidEnrollmentController {
    private final CovidEnrollmentService service;

    @PostMapping("/enrollments")
    public CovidPatientEnrollmentDTO SaveEnrollment(@RequestBody CovidPatientEnrollmentDTO dto){
        return service.SavePatientEnrollment(dto);
    }

    @PutMapping("/enrollments/{id}")
    public CovidPatientEnrollmentDTO UpdateEnrollment(@RequestBody CovidPatientEnrollmentDTO dto, @PathVariable String id){
        return service.SavePatientEnrollment(dto);
    }

    @GetMapping("/enrollments/patients/{patientId}")
    public CovidPatientEnrollmentResponseDTO GetEnrollmentByPatientId(@PathVariable long patientId){
        return service.GetEnrollmentByPatientId(patientId);
    }

    @DeleteMapping("/enrollments/{id}")
    public String DeleteEnrollment(@PathVariable Long id){
        return service.Delete(id);
    }
}
