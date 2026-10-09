package org.lamisplus.modules.immunization.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.immunization.domain.dto.ImmunizationDTO;
import org.lamisplus.modules.immunization.domain.entity.Immunization;
import org.lamisplus.modules.immunization.service.ImmunizationService;
import org.lamisplus.modules.immunization.service.ImmunizationValidationException;
import org.mockito.ArgumentCaptor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.time.LocalDate;
import java.util.Collections;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class ImmunizationControllerTest {

    private static final String BASE = "/api/v1/immunization";
    // Configured like Spring Boot's auto-configured mapper (ISO dates).
    private final ObjectMapper objectMapper = Jackson2ObjectMapperBuilder.json()
            .featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS).build();
    private ImmunizationService service;
    private MockMvc mvc;

    @BeforeEach
    void setUp() {
        service = mock(ImmunizationService.class);
        LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();
        validator.afterPropertiesSet();
        mvc = MockMvcBuilders.standaloneSetup(new ImmunizationController(service))
                .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
                .setMessageConverters(new MappingJackson2HttpMessageConverter(objectMapper))
                .setValidator(validator)
                .build();
    }

    // Reads a dotted path ("apierror.subErrors.length()") from the response JSON.
    private JsonNode at(org.springframework.test.web.servlet.MvcResult result, String path) throws Exception {
        JsonNode node = objectMapper.readTree(result.getResponse().getContentAsString());
        for (String part : path.split("\\.")) {
            if (part.equals("length()")) return objectMapper.getNodeFactory().numberNode(node.size());
            node = node.path(part);
        }
        return node;
    }

    private ResultMatcher json(String path, Object expected) {
        return result -> {
            JsonNode node = at(result, path);
            Object actual = expected instanceof Number ? (Object) node.asLong() : node.asText();
            Object want = expected instanceof Number ? (Object) ((Number) expected).longValue() : expected;
            assertEquals(want, actual, path + " in " + result.getResponse().getContentAsString());
        };
    }

    private ResultMatcher jsonContains(String path, String expected) {
        return result -> {
            String actual = at(result, path).asText();
            assertTrue(actual.contains(expected), path + " = '" + actual + "' should contain '" + expected + "'");
        };
    }

    private static String validBody() {
        return "{\"patientId\":29262,\"patientUuid\":\"" + UUID.randomUUID() + "\"," +
                "\"immunizationType\":\"TETANUS_IMMUNIZATION\",\"vaccinationDate\":\"2026-10-01\"," +
                "\"uniqueImmunizationData\":{\"vaccineType\":\"TETANUS_VACCINE_TD1\"}}";
    }

    @Test
    void createWithoutPatientIsRejectedWithFieldReasons() throws Exception {
        mvc.perform(post(BASE).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"immunizationType\":\"TETANUS_IMMUNIZATION\",\"vaccinationDate\":\"2026-10-01\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(json("apierror.statusCode", 400))
                .andExpect(json("apierror.message", "patientId is required; patientUuid is required"))
                .andExpect(json("apierror.subErrors.length()", 2));
        verify(service, never()).saveImmunization(any());
    }

    @Test
    void createRejectsUnknownTypeAndFutureDate() throws Exception {
        String body = "{\"patientId\":1,\"patientUuid\":\"" + UUID.randomUUID() + "\"," +
                "\"immunizationType\":\"FLU\",\"vaccinationDate\":\"" + LocalDate.now().plusDays(1) + "\"}";
        mvc.perform(post(BASE).contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonContains("apierror.message", "immunizationType must be one of"))
                .andExpect(jsonContains("apierror.message", "vaccinationDate cannot be in the future"));
    }

    @Test
    void malformedDateIsA400WithAReadableMessage() throws Exception {
        mvc.perform(post(BASE).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"patientId\":1,\"immunizationType\":\"TETANUS_IMMUNIZATION\",\"vaccinationDate\":\"not-a-date\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonContains("apierror.message", "Malformed request body"));
    }

    @Test
    void validCreateReachesTheService() throws Exception {
        when(service.saveImmunization(any())).thenAnswer(inv -> inv.getArgument(0));
        mvc.perform(post(BASE).contentType(MediaType.APPLICATION_JSON).content(validBody()))
                .andExpect(status().isOk())
                .andExpect(json("patientId", 29262))
                .andExpect(json("vaccinationDate", "2026-10-01"));
    }

    @Test
    void unknownPatientIsA400WithTheReason() throws Exception {
        when(service.saveImmunization(any()))
                .thenThrow(new ImmunizationValidationException("No active patient with id 29262 and uuid x."));
        mvc.perform(post(BASE).contentType(MediaType.APPLICATION_JSON).content(validBody()))
                .andExpect(status().isBadRequest())
                .andExpect(json("apierror.message", "No active patient with id 29262 and uuid x."));
    }

    @Test
    void missingRecordIsA404NotA500() throws Exception {
        when(service.getImmunizationById(999L))
                .thenThrow(new EntityNotFoundException(Immunization.class, "id", "999"));
        mvc.perform(get(BASE + "/999"))
                .andExpect(status().isNotFound())
                .andExpect(json("apierror.statusCode", 404))
                .andExpect(jsonContains("apierror.message", "Immunization was not found"));

        when(service.updateImmunization(eq(999L), any()))
                .thenThrow(new EntityNotFoundException(Immunization.class, "id", "999"));
        mvc.perform(put(BASE + "/999").contentType(MediaType.APPLICATION_JSON).content(validBody()))
                .andExpect(status().isNotFound());

        when(service.archiveImmunization(999L))
                .thenThrow(new EntityNotFoundException(Immunization.class, "id", "999"));
        mvc.perform(put(BASE + "/999/archive")).andExpect(status().isNotFound());
    }

    @Test
    void nonNumericIdIsA400() throws Exception {
        mvc.perform(get(BASE + "/abc"))
                .andExpect(status().isBadRequest())
                .andExpect(json("apierror.message", "Invalid value 'abc' for parameter 'id'."));
    }

    @Test
    void historyHonoursPageAndSizeParameters() throws Exception {
        when(service.getPatientImmunizationHistoryPaged(anyLong(), any()))
                .thenReturn(new PageImpl<>(Collections.emptyList()));
        mvc.perform(get(BASE + "/history/29262").param("page", "2").param("size", "5"))
                .andExpect(status().isOk());

        ArgumentCaptor<Pageable> pageable = ArgumentCaptor.forClass(Pageable.class);
        verify(service).getPatientImmunizationHistoryPaged(eq(29262L), pageable.capture());
        assertEquals(2, pageable.getValue().getPageNumber());
        assertEquals(5, pageable.getValue().getPageSize());
    }

    @Test
    void vaccinatedPatientsPassesSearchAndPage() throws Exception {
        when(service.getVaccinatedPatientsPaged(any(), any()))
                .thenReturn(new PageImpl<>(Collections.emptyList()));
        mvc.perform(get(BASE + "/patients").param("page", "1").param("size", "10").param("search", "Ake"))
                .andExpect(status().isOk());

        ArgumentCaptor<Pageable> pageable = ArgumentCaptor.forClass(Pageable.class);
        verify(service).getVaccinatedPatientsPaged(eq("Ake"), pageable.capture());
        assertEquals(1, pageable.getValue().getPageNumber());
        assertEquals(10, pageable.getValue().getPageSize());
    }

    @Test
    void vaccinatedPatientsSearchDefaultsToEmpty() throws Exception {
        when(service.getVaccinatedPatientsPaged(any(), any()))
                .thenReturn(new PageImpl<>(Collections.emptyList()));
        mvc.perform(get(BASE + "/patients")).andExpect(status().isOk());
        verify(service).getVaccinatedPatientsPaged(eq(""), any());
    }
}
