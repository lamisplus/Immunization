package org.lamisplus.modules.immunization.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.immunization.domain.dto.ImmunizationDTO;
import org.lamisplus.modules.immunization.domain.entity.Immunization;
import org.lamisplus.modules.immunization.repository.ImmunizationRepository;
import org.mockito.ArgumentCaptor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class ImmunizationServiceTest {

    private static final UUID PATIENT_UUID = UUID.fromString("5d1c7d2e-0000-4000-8000-000000000001");
    private ImmunizationRepository repository;
    private ImmunizationService service;

    @BeforeEach
    void setUp() {
        repository = mock(ImmunizationRepository.class);
        service = new ImmunizationService(repository);
        // Like JPA, hand back a separate saved instance (with a generated id
        // for new rows) and leave the argument untouched for inspection.
        when(repository.save(any(Immunization.class))).thenAnswer(inv -> {
            Immunization arg = inv.getArgument(0);
            return Immunization.builder()
                    .id(arg.getId() == null ? 100L : arg.getId())
                    .patientId(arg.getPatientId()).patientUuid(arg.getPatientUuid())
                    .immunizationType(arg.getImmunizationType()).vaccinationDate(arg.getVaccinationDate())
                    .uniqueImmunizationData(arg.getUniqueImmunizationData()).archived(arg.getArchived())
                    .build();
        });
    }

    private static ImmunizationDTO dto(Long patientId) {
        return ImmunizationDTO.builder()
                .patientId(patientId)
                .patientUuid(PATIENT_UUID)
                .immunizationType("TETANUS_IMMUNIZATION")
                .vaccinationDate(LocalDate.of(2026, 10, 1))
                .build();
    }

    private static Immunization stored(long id, long patientId) {
        return Immunization.builder().id(id).patientId(patientId).patientUuid(PATIENT_UUID)
                .immunizationType("TETANUS_IMMUNIZATION").vaccinationDate(LocalDate.of(2026, 9, 16))
                .archived(0).build();
    }

    @Test
    void createIsRefusedForAPatientThatDoesNotExist() {
        when(repository.activePatientExists(29262L, PATIENT_UUID.toString())).thenReturn(false);

        ImmunizationValidationException ex =
                assertThrows(ImmunizationValidationException.class, () -> service.saveImmunization(dto(29262L)));
        assertTrue(ex.getMessage().contains("No active patient with id 29262"));
        verify(repository, never()).save(any());
    }

    @Test
    void createNeverOverwritesAnExistingRowOrStartsArchived() {
        when(repository.activePatientExists(anyLong(), anyString())).thenReturn(true);
        ImmunizationDTO request = dto(29262L);
        request.setId(3L);
        request.setArchived(1);

        ImmunizationDTO saved = service.saveImmunization(request);

        ArgumentCaptor<Immunization> entity = ArgumentCaptor.forClass(Immunization.class);
        verify(repository).save(entity.capture());
        assertNull(entity.getValue().getId());
        assertEquals(0, entity.getValue().getArchived());
        assertEquals(100L, saved.getId());
    }

    @Test
    void updateCannotMoveARecordToAnotherPatient() {
        when(repository.findByIdAndAndArchived(5L, 0)).thenReturn(Optional.of(stored(5L, 29262L)));

        ImmunizationValidationException ex =
                assertThrows(ImmunizationValidationException.class, () -> service.updateImmunization(5L, dto(29270L)));
        assertTrue(ex.getMessage().contains("cannot be moved to patient 29270"));
        verify(repository, never()).save(any());
    }

    @Test
    void updateKeepsIdAndActiveState() {
        when(repository.findByIdAndAndArchived(5L, 0)).thenReturn(Optional.of(stored(5L, 29262L)));
        when(repository.activePatientExists(anyLong(), anyString())).thenReturn(true);
        ImmunizationDTO request = dto(29262L);
        request.setArchived(1);

        service.updateImmunization(5L, request);

        ArgumentCaptor<Immunization> entity = ArgumentCaptor.forClass(Immunization.class);
        verify(repository).save(entity.capture());
        assertEquals(5L, entity.getValue().getId());
        assertEquals(0, entity.getValue().getArchived());
    }

    @Test
    void missingRecordsRaiseEntityNotFound() {
        when(repository.findByIdAndAndArchived(anyLong(), eq(0))).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> service.getImmunizationById(9L));
        assertThrows(EntityNotFoundException.class, () -> service.archiveImmunization(9L));
        assertThrows(EntityNotFoundException.class, () -> service.updateImmunization(9L, dto(1L)));
    }

    @Test
    void vaccinatedPatientSearchIsTrimmedAndLikeEscaped() {
        Page<Immunization> empty = new PageImpl<>(Collections.emptyList());
        when(repository.getLatestPerPatient(anyString(), anyString(), any())).thenReturn(empty);

        service.getVaccinatedPatientsPaged("  50%_off ", PageRequest.of(0, 10));
        verify(repository).getLatestPerPatient(eq("50%_off"), eq("%50\\%\\_off%"), any());

        service.getVaccinatedPatientsPaged(null, PageRequest.of(0, 10));
        verify(repository).getLatestPerPatient(eq(""), eq("%%"), any());
    }
}
