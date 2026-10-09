package org.lamisplus.modules.immunization.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.base.controller.apierror.ApiError;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.immunization.domain.dto.ImmunizationDTO;
import org.lamisplus.modules.immunization.service.ImmunizationService;
import org.lamisplus.modules.immunization.service.ImmunizationValidationException;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.validation.Valid;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/immunization")
public class ImmunizationController {

    private final ImmunizationService immunizationService;

    @PostMapping
    public ResponseEntity<ImmunizationDTO> saveImmunization(@Valid @RequestBody ImmunizationDTO immunizationDTO){
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
                                              @Valid @RequestBody ImmunizationDTO immunizationDTO){
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

    // One page of vaccinated patients (latest record each), optionally
    // filtered by name or identifier.
    @GetMapping("/patients")
    public Page<ImmunizationDTO> getVaccinatedPatients(
            @RequestParam(value = "search", defaultValue = "") String search, Pageable pageable){
        return immunizationService.getVaccinatedPatientsPaged(search, pageable);
    }

    // Errors are answered here, in the LAMISPlus ApiError shape, so clients
    // get a status and a readable reason instead of a bare 500.

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(EntityNotFoundException ex) {
        return error(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    }

    @ExceptionHandler(ImmunizationValidationException.class)
    public ResponseEntity<ApiError> handleInvalid(ImmunizationValidationException ex) {
        return error(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(FieldError::getDefaultMessage)
                .sorted()
                .collect(Collectors.joining("; "));
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
        apiError.setStatusCode(HttpStatus.BAD_REQUEST.value());
        apiError.setMessage(message.isEmpty() ? "Validation error" : message);
        apiError.addValidationErrors(ex.getBindingResult().getFieldErrors());
        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> handleUnreadable(HttpMessageNotReadableException ex) {
        return error(HttpStatus.BAD_REQUEST,
                "Malformed request body; check field formats (dates are yyyy-MM-dd).", ex);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiError> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        return error(HttpStatus.BAD_REQUEST,
                "Invalid value '" + ex.getValue() + "' for parameter '" + ex.getName() + "'.", ex);
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ApiError> handleDataAccess(DataAccessException ex) {
        log.error("Immunization database error", ex);
        return error(HttpStatus.INTERNAL_SERVER_ERROR,
                "The immunization record could not be read or saved because of a database error.", null);
    }

    private static ResponseEntity<ApiError> error(HttpStatus status, String message, Throwable ex) {
        ApiError apiError = new ApiError(status);
        apiError.setStatusCode(status.value());
        apiError.setMessage(message);
        if (ex != null) {
            apiError.setDebugMessage(ex.getLocalizedMessage());
        }
        return new ResponseEntity<>(apiError, status);
    }
}
