package org.lamisplus.modules.covid.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.covid.domain.dto.ImmunizationDTO;
import org.lamisplus.modules.covid.domain.entity.Immunization;
//import org.lamisplus.modules.covid.domain.entity.RoutineImmunization;
import org.lamisplus.modules.covid.repository.ImmunizationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Service
@RequiredArgsConstructor
@RestController

public class ImmunizationService {
    private final ImmunizationRepository immunizationRepository;

    public ImmunizationDTO saveImmunization(ImmunizationDTO immunizationDTO) {
        Immunization immunizationToBeSaved = Immunization.createFromDto(immunizationDTO);
        Immunization savedRoutineImmunization =
                immunizationRepository.save(immunizationToBeSaved);
        return ImmunizationDTO.createFromEntity(savedRoutineImmunization);
    }

    public ImmunizationDTO getImmunizationById(Long id){
        return ImmunizationDTO.createFromEntity(immunizationRepository.findByIdAndAndArchived(id, 0).orElseThrow(()->
                new RuntimeException("Immunization By provided Id not found.")
        ));
    }

    public String archiveImmunization(Long id){
        Immunization immunization = immunizationRepository.findByIdAndAndArchived(id, 0).orElseThrow(()->
                new RuntimeException("Immunization By provided Id not found.")
        );

        immunization.setArchived(1);
        immunizationRepository.save(immunization);
        return "Immunization deleted successfully.";
    }

    public ImmunizationDTO updateImmunization(Long id, ImmunizationDTO immunizationDTO){
        Immunization immunization = immunizationRepository.findByIdAndAndArchived(id, 0).orElseThrow(()->
                new RuntimeException("Immunization By provided Id not found.")
        );
        Immunization toBeSaved = Immunization.createFromDto(immunizationDTO);
        toBeSaved.setId(id);
        Immunization saved = immunizationRepository.save(toBeSaved);
        return ImmunizationDTO.createFromEntity(saved);
    }

    public Page<ImmunizationDTO> getPatientImmunizationHistoryPaged(Long patienId, Pageable pageable){
        return immunizationRepository
                .getPagedByPatientIdAndArchived(patienId, 0, pageable)
                .map(ImmunizationDTO::createFromEntity);
    }

    public Page<ImmunizationDTO> getAllImmunizationsPaged(Pageable pageable){
        return immunizationRepository
                .getAllPaged(pageable)
                .map(ImmunizationDTO::createFromEntity);
    }



}
