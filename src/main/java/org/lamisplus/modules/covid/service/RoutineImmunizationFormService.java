package org.lamisplus.modules.covid.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.covid.domain.dto.RoutineImmunizationFormDTO;
import org.lamisplus.modules.covid.domain.entity.RoutineImmunizationForm;
import org.lamisplus.modules.covid.repository.RoutineImmunizationFormRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@RestController
public class RoutineImmunizationFormService {
    private final RoutineImmunizationFormRepository routineImmunizationFormRepository;

    public String SaveRoutineImmunization(RoutineImmunizationFormDTO routineImmunizationFormDTO) {
        RoutineImmunizationForm routineImmunizationFormToBeSaved = new RoutineImmunizationForm();
        routineImmunizationFormRepository.save(routineImmunizationFormToBeSaved);
        return "Saved successfully";
    }


}
