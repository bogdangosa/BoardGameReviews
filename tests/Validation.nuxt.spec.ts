import { describe, it, expect, vi } from "vitest";
import isDataValid from "../utils/validators";

describe("isDataValid", () => {
  const handleError = () => {};
  it("should return false if boardGameName is empty", () => {
    const result = isDataValid(
      "",
      "A fun game",
      "image.png",
      "Strategy",
      handleError
    );
    expect(result).toBe(false);
  });

  it("should return false if boardGameDescription is empty", () => {
    const result = isDataValid(
      "Chess",
      "",
      "image.png",
      "Strategy",
      handleError
    );
    expect(result).toBe(false);
  });

  it("should return false if boardGameImage is empty", () => {
    const result = isDataValid(
      "Chess",
      "A fun game",
      "",
      "Strategy",
      handleError
    );
    expect(result).toBe(false);
  });

  it("should return false if selectedCategory is empty", () => {
    const result = isDataValid(
      "Chess",
      "A fun game",
      "image.png",
      "",
      handleError
    );
    expect(result).toBe(false);
  });

  it("should return false if boardGameName is less than 3 characters", () => {
    const result = isDataValid(
      "Go",
      "A fun game",
      "image.png",
      "Strategy",
      handleError
    );
    expect(result).toBe(false);
  });

  it("should return false if boardGameDescription is less than 10 characters", () => {
    const result = isDataValid(
      "Chess",
      "Fun game",
      "image.png",
      "Strategy",
      handleError
    );
    expect(result).toBe(false);
  });

  it("should return true if all fields are valid", () => {
    const result = isDataValid(
      "Chess",
      "A fun strategy game",
      "image.png",
      "Strategy",
      handleError
    );
    expect(result).toBe(true);
  });
});
