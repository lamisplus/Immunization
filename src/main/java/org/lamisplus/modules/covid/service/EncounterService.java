package org.lamisplus.modules.covid.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.covid.domain.dto.CovidEncounterDTO;
import org.lamisplus.modules.covid.domain.entity.CovidEncounter;
import org.lamisplus.modules.covid.domain.mapper.CovidMapper;
import org.lamisplus.modules.covid.repository.EncounterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EncounterService {
    private final EncounterRepository repository;
    private final CovidMapper mapper;

    public CovidEncounterDTO Save(CovidEncounterDTO encounterDTO){
        CovidEncounter encounter = mapper.toEncounter(encounterDTO);
        return mapper.toEncounterDto(repository.save(encounter));
    }

    public CovidEncounterDTO Update(int id, CovidEncounterDTO encounterDTO){
        CovidEncounter encounter = mapper.toEncounter(encounterDTO);
        return mapper.toEncounterDto(repository.save(encounter));
    }

    public List<CovidEncounterDTO> GetAllEncountersByPatientId(Long patientId, String category) {
        return mapper.toEncounterDtoList(repository.findEncountersByPatientIdAndCategory(patientId, category));
    }

    public String Delete(int id) {
        CovidEncounter encounter = repository.findById(id).orElse(null);
        repository.delete(encounter);
        return id + " deleted successfully";
    }
}
