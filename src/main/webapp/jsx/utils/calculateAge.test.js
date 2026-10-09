import { calculateAge, calculateAgeNoText } from "./calculateAge";

describe("calculateAge", () => {
  beforeEach(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2026, 9, 9)); // 9 Oct 2026
  });
  afterEach(() => jest.useRealTimers());

  it("reads the ISO dates the patient API returns", () => {
    expect(calculateAge("2013-07-06")).toBe("13 year(s)");
  });

  it("still reads DD-MM-YYYY dates", () => {
    expect(calculateAge("06-07-2013")).toBe("13 year(s)");
  });

  it("does not count a year until the birthday is reached", () => {
    expect(calculateAge("2013-10-10")).toBe("12 year(s)");
    expect(calculateAge("2013-10-09")).toBe("13 year(s)");
  });

  it("reports months for children under a year, across a year boundary", () => {
    expect(calculateAge("2025-12-15")).toBe("9 month(s)");
    expect(calculateAge("2026-08-09")).toBe("2 month(s)");
    expect(calculateAge("2026-10-01")).toBe("0 month(s)");
  });

  it("measures against a reference date when one is given", () => {
    expect(calculateAge("2013-07-06", "2022-07-05")).toBe("8 year(s)");
    expect(calculateAge("2026-01-30", "2026-03-15")).toBe("1 month(s)");
  });

  it("returns an empty string for missing, invalid or future dates", () => {
    expect(calculateAge(undefined)).toBe("");
    expect(calculateAge(null)).toBe("");
    expect(calculateAge("not-a-date")).toBe("");
    expect(calculateAge("2027-01-01")).toBe("");
  });
});

describe("calculateAgeNoText (COVID-19 menu gate, age >= 5)", () => {
  beforeEach(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2026, 9, 9));
  });
  afterEach(() => jest.useRealTimers());

  it("returns whole years", () => {
    expect(calculateAgeNoText("2013-07-06")).toBe(13);
    expect(calculateAgeNoText("2021-10-09")).toBe(5);
  });

  it("does not round up a child whose birthday has not come yet this year", () => {
    expect(calculateAgeNoText("2021-12-01")).toBe(4);
  });

  it("returns 0 years (not a month count) for infants", () => {
    expect(calculateAgeNoText("2026-01-05")).toBe(0);
  });

  it("returns 0 for a missing date", () => {
    expect(calculateAgeNoText(undefined)).toBe(0);
  });
});
