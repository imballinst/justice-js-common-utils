/*
 * Copyright (c) 2019. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Validation } from "./Validation";

describe("Return isAllValid function with correct output", () => {
  it("Should return true if validation is empty", () => {
    const validation = new Validation();
    const called = validation.isAllValid();
    expect(called).toBe(true);
  });

  it("Should return true if validation has value and all value are null", () => {
    const validation: Validation<{
      "variable 1": string;
      "variable 2": string;
      "variable 3": string;
    }> = new Validation();
    validation.set("variable 1", null);
    validation.set("variable 2", null);
    validation.set("variable 3", null);
    const isAllValid = validation.isAllValid();
    expect(isAllValid).toBe(true);
  });

  it("Should return false if validation has string value and null at the end of array", () => {
    const validation: Validation<{
      "variable 1": string;
      "variable 2": string;
      "variable 3": string;
    }> = new Validation();
    validation.set("variable 1", "null");
    validation.set("variable 2", "ashdjgsak");
    validation.set("variable 3", null);
    const isAllValid = validation.isAllValid();
    expect(isAllValid).toBe(false);
  });

  it("Should return false if validation has string value and null in the beginning of array", () => {
    const validation: Validation<{
      "variable 1": string;
      "variable 2": string;
      "variable 3": string;
    }> = new Validation();
    validation.set("variable 1", null);
    validation.set("variable 2", "ashdjgsak");
    validation.set("variable 3", "null");
    const isAllValid = validation.isAllValid();
    expect(isAllValid).toBe(false);
  });

  it("Should return false if validation has string value and null in the middle of array", () => {
    const validation: Validation<{
      "variable 1": string;
      "variable 2": string;
      "variable 3": string;
    }> = new Validation();
    validation.set("variable 1", "asdsad");
    validation.set("variable 2", null);
    validation.set("variable 3", "asdas");
    const isAllValid = validation.isAllValid();
    expect(isAllValid).toBe(false);
  });

  it("Should return false if all value contain string", () => {
    const validation: Validation<{
      "variable 1": string;
      "variable 2": string;
      "variable 3": string;
    }> = new Validation();
    validation.set("variable 1", "zxchg");
    validation.set("variable 2", "ashdjgsak");
    validation.set("variable 3", "asdas");
    const isAllValid = validation.isAllValid();
    expect(isAllValid).toBe(false);
  });

  it("Should return false if value contain non empty string", () => {
    const validation: Validation<{
      "variable 1": string;
      "variable 2": string;
      "variable 3": string;
    }> = new Validation();
    validation.set("variable 1", "");
    validation.set("variable 2", "ashdjgsak");
    validation.set("variable 3", null);
    const isAllValid = validation.isAllValid();
    expect(isAllValid).toBe(false);
  });

  it("isValid should return `true` if the validation is null", () => {
    const validation: Validation<{ field: string }> = new Validation();
    validation.set("field", null);

    const isFieldValid = validation.isValid("field");
    expect(isFieldValid).toBe(true);
  });

  it("isValid should return `true` if we haven't validated it", () => {
    const validation: Validation<{ field: string }> = new Validation();

    const isFieldValid = validation.isValid("field");
    expect(isFieldValid).toBe(true);
  });

  it("isValid should return `false` if the validation is not null or undefined", () => {
    const validation: Validation<{ field: string }> = new Validation();
    validation.set("field", "containsBadWords");

    const isFieldValid = validation.isValid("field");
    expect(isFieldValid).toBe(false);
  });
});
