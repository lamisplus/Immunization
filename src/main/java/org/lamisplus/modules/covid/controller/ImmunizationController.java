package org.lamisplus.modules.covid.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.covid.domain.dto.ImmunizationDTO;
import org.lamisplus.modules.covid.service.ImmunizationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/immunization")
public class ImmunizationController {

    private final ImmunizationService immunizationService;

    @PostMapping
    public ResponseEntity<ImmunizationDTO> saveImmunization(@RequestBody ImmunizationDTO immunizationDTO){
        return ResponseEntity.ok(immunizationService.saveImmunization(immunizationDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImmunizationDTO> getImmunizationById(@PathVariable("id") Long id){
        return ResponseEntity.ok(immunizationService.getImmunizationById(id));
    }

    @PutMapping("/{id}/archive")
    public String archiveImmunization(@PathVariable("id") Long id){
        return immunizationService.archiveImmunization(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImmunizationDTO> updateImmunization(@PathVariable("id") Long id,
                                              @RequestBody ImmunizationDTO immunizationDTO){
        return ResponseEntity.ok(immunizationService.updateImmunization(id, immunizationDTO));
    }

    @GetMapping("/history/{patientId}")
    public Page<ImmunizationDTO> getPatientImmunizationHistory(
            @PathVariable("patientId") Long patientId, Pageable pageable){
        return immunizationService.getPatientImmunizationHistoryPaged(patientId, pageable);
    }

    @GetMapping("/history/all")
    public Page<ImmunizationDTO> getAllPaged(Pageable pageable){
        return immunizationService.getAllImmunizationsPaged(pageable);
    }
}
