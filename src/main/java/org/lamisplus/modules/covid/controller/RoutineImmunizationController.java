package org.lamisplus.modules.covid.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.covid.domain.dto.CovidPatientEnrollmentDTO;
import org.lamisplus.modules.covid.domain.dto.RoutineImmunizationFormDTO;
import org.lamisplus.modules.covid.service.RoutineImmunizationFormService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/routine-immunization")
public class RoutineImmunizationController {

    private final RoutineImmunizationFormService routineImmunizationFormService;

    @PostMapping("")
    public String SaveRoutineImmunization(@RequestBody RoutineImmunizationFormDTO routineImmunizationFormDTO){
        return routineImmunizationFormService.SaveRoutineImmunization(routineImmunizationFormDTO);
    }


}
