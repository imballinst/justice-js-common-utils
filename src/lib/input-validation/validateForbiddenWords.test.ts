/*
 * Copyright (c) 2022. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { validateForbiddenWords, ValidateForbiddenWordsErrorType } from "./validateForbiddenWords";

const mockValidateForbiddenWords = jest.fn(validateForbiddenWords);
afterEach(mockValidateForbiddenWords.mockClear);
afterAll(mockValidateForbiddenWords.mockRestore);

describe("validateForbiddenWords returns correct output", () => {
  it("returns null when given empty string, but it is not a required field", () => {
    mockValidateForbiddenWords("", ["forbidden"], { isRequired: false });
    expect(mockValidateForbiddenWords).toHaveBeenCalledTimes(1);
    expect(mockValidateForbiddenWords).toHaveReturnedWith(null);
  });

  it("returns error string 'empty' when given empty string", () => {
    mockValidateForbiddenWords("", ["forbidden"]);
    expect(mockValidateForbiddenWords).toHaveBeenCalledTimes(1);
    expect(mockValidateForbiddenWords).toHaveReturnedWith(ValidateForbiddenWordsErrorType.empty);
  });

  it("returns null when the value doesn't contain forbidden words", () => {
    mockValidateForbiddenWords("accelbyte", ["forbidden", "words"]);
    expect(mockValidateForbiddenWords).toHaveBeenCalledTimes(1);
    expect(mockValidateForbiddenWords).toHaveReturnedWith(null);
  });

  it("returns error string 'containsForbiddenWords' when the value contains any of the listed forbidden word", () => {
    mockValidateForbiddenWords("yesmilord", ["lord", "king"]);
    expect(mockValidateForbiddenWords).toHaveBeenCalledTimes(1);
    expect(mockValidateForbiddenWords).toHaveReturnedWith(ValidateForbiddenWordsErrorType.containsForbiddenWords);
  });

  // tslint:disable-next-line:max-line-length
  it("returns 'containsForbiddenWords' when `isCaseSensitive` is false and the value contains a forbidden word regardless the word case", () => {
    mockValidateForbiddenWords("yesMiLorD", ["lord", "king"], { isCaseSensitive: false });
    expect(mockValidateForbiddenWords).toHaveBeenCalledTimes(1);
    expect(mockValidateForbiddenWords).toHaveReturnedWith(ValidateForbiddenWordsErrorType.containsForbiddenWords);
  });

  // tslint:disable-next-line:max-line-length
  it("returns null when `isCaseSensitive` is true and the value contains a forbidden word regardless the word case", () => {
    mockValidateForbiddenWords("yesMiLorD", ["lord", "king"], { isCaseSensitive: true });
    expect(mockValidateForbiddenWords).toHaveBeenCalledTimes(1);
    expect(mockValidateForbiddenWords).toHaveReturnedWith(null);
  });
});
