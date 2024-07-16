import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./sum";

describe("testing sum_to_n_a O(1)", () => {
  test("given 5 should return result in 15", () => {
    expect(sum_to_n_a(5)).toBe(15);
  });

  test("given 100 should return result in 5050", () => {
    expect(sum_to_n_a(100)).toBe(5050);
  });

  test("given a number smaller than 0 should return itself", () => {
    expect(sum_to_n_a(-5)).toBe(-5);
  });
});

describe("testing sum_to_n_b O(log n)", () => {
  test("given 5 should return result in 15", () => {
    expect(sum_to_n_b(5)).toBe(15);
  });

  test("given 100 should return result in 5050", () => {
    expect(sum_to_n_b(100)).toBe(5050);
  });

  test("given a number smaller than 0 should return itself", () => {
    expect(sum_to_n_b(-5)).toBe(-5);
  });
});


describe("testing sum_to_n_c O(n)", () => {
  test("given 5 should return result in 15", () => {
    expect(sum_to_n_c(5)).toBe(15);
  });

  test("given 100 should return result in 5050", () => {
    expect(sum_to_n_c(100)).toBe(5050);
  });

  test("given a number smaller than 0 should return itself", () => {
    expect(sum_to_n_c(-5)).toBe(-5);
  });
});