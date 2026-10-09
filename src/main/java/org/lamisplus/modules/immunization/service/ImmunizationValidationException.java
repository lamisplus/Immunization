package org.lamisplus.modules.immunization.service;

/**
 * A request that is well-formed but cannot be applied, e.g. it names a
 * patient that does not exist. Reported to the client as 400.
 */
public class ImmunizationValidationException extends RuntimeException {
    public ImmunizationValidationException(String message) {
        super(message);
    }
}
