package org.lamisplus.modules.immunization.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.immunization.domain.dto.ImmunizationDTO;
import org.lamisplus.modules.immunization.domain.entity.Immunization;
import org.lamisplus.modules.immunization.repository.ImmunizationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor

public class ImmunizationService {
    private final ImmunizationRepository immunizationRepository;

    public ImmunizationDTO saveImmunization(ImmunizationDTO immunizationDTO) {
        requireActivePatient(immunizationDTO);
        Immunization immunizationToBeSaved = Immunization.createFromDto(immunizationDTO);
        // A create never targets an existing row and always starts active.
        immunizationToBeSaved.setId(null);
        immunizationToBeSaved.setArchived(0);
        Immunization savedRoutineImmunization =
                immunizationRepository.save(immunizationToBeSaved);
        return ImmunizationDTO.createFromEntity(savedRoutineImmunization);
    }

    public ImmunizationDTO getImmunizationById(Long id){
        return ImmunizationDTO.createFromEntity(findActive(id));
    }

    public String archiveImmunization(Long id){
        Immunization immunization = findActive(id);

        immunization.setArchived(1);
        immunizationRepository.save(immunization);
        return "Immunization deleted successfully.";
    }

    public ImmunizationDTO updateImmunization(Long id, ImmunizationDTO immunizationDTO){
        Immunization immunization = findActive(id);
        if (!immunization.getPatientId().equals(immunizationDTO.getPatientId())) {
            throw new ImmunizationValidationException(
                    "Immunization " + id + " belongs to patient " + immunization.getPatientId()
                            + " and cannot be moved to patient " + immunizationDTO.getPatientId() + ".");
        }
        requireActivePatient(immunizationDTO);
        Immunization toBeSaved = Immunization.createFromDto(immunizationDTO);
        toBeSaved.setId(id);
        toBeSaved.setArchived(immunization.getArchived());
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

    public Page<ImmunizationDTO> getVaccinatedPatientsPaged(String search, Pageable pageable){
        String term = search == null ? "" : search.trim();
        return immunizationRepository
                .getLatestPerPatient(term, "%" + escapeLike(term) + "%", pageable)
                .map(ImmunizationDTO::createFromEntity);
    }

    private Immunization findActive(Long id) {
        return immunizationRepository.findByIdAndAndArchived(id, 0).orElseThrow(() ->
                new EntityNotFoundException(Immunization.class, "id", String.valueOf(id)));
    }

    private void requireActivePatient(ImmunizationDTO immunizationDTO) {
        Long patientId = immunizationDTO.getPatientId();
        String patientUuid = String.valueOf(immunizationDTO.getPatientUuid());
        if (!immunizationRepository.activePatientExists(patientId, patientUuid)) {
            throw new ImmunizationValidationException(
                    "No active patient with id " + patientId + " and uuid " + patientUuid + ".");
        }
    }

    // ILIKE treats % and _ as wildcards; match them literally.
    private static String escapeLike(String term) {
        return term.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_");
    }
}
