import { getErrorMessage, getImmunizationLabel } from "./mutationFeedback";
import { springError, unauthorizedError, networkError } from "../testUtils";

describe("getErrorMessage", () => {
  it("uses Spring's `error` when its `message` is empty (server default)", () => {
    expect(getErrorMessage(springError(500, "Internal Server Error"))).toBe(
      "Internal Server Error"
    );
    expect(getErrorMessage(springError(400, "Bad Request"))).toBe("Bad Request");
  });

  it("prefers a non-empty server message", () => {
    const error = springError(500, "Internal Server Error");
    error.response.data.message = "Immunization By provided Id not found.";
    expect(getErrorMessage(error)).toBe("Immunization By provided Id not found.");
  });

  it("reads the security filter's nested message on 401", () => {
    expect(getErrorMessage(unauthorizedError())).toBe("Invalid Token");
  });

  it("falls back to the transport error when there is no response", () => {
    expect(getErrorMessage(networkError())).toBe("Network Error");
    expect(getErrorMessage(undefined)).toBe("Unknown error");
  });
});

describe("getImmunizationLabel", () => {
  it("names each immunization type", () => {
    expect(getImmunizationLabel("ROUTINE_IMMUNIZATION")).toBe("Routine Immunization");
    expect(getImmunizationLabel("TETANUS_IMMUNIZATION")).toBe("Tetanus Immunization");
    expect(getImmunizationLabel("COVID_IMMUNIZATION")).toBe("COVID-19 Vaccination");
    expect(getImmunizationLabel(undefined)).toBe("Immunization");
  });
});
