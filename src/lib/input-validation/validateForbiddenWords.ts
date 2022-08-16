/*
 * Copyright (c) 2022. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { isEmpty } from "validator";
import { Enum } from "../../types/types";
import { CommonValidationErrorType } from "./constant/errorType";

export const ValidateForbiddenWordsErrorType = Enum(
  CommonValidationErrorType.empty,
  CommonValidationErrorType.containsForbiddenWords
);
export type ValidateForbiddenWordsErrorType = Enum<typeof ValidateForbiddenWordsErrorType>;

interface ValidateForbiddenWordsOptions {
  isRequired?: boolean;
  isCaseSensitive?: boolean;
}

export const validateForbiddenWords = (
  value: string,
  forbiddenWords: string[],
  { isRequired = true, isCaseSensitive = false }: ValidateForbiddenWordsOptions = {}
) => {
  if (isEmpty(value)) {
    if (!isRequired) {
      return null;
    }
    return ValidateForbiddenWordsErrorType.empty;
  }

  const filteredForbiddenWords = forbiddenWords
    .filter(Boolean)
    .map((word) => (isCaseSensitive ? word : word.toLowerCase()));
  const finalValue = isCaseSensitive ? value : value.toLowerCase();
  const isForbidden = filteredForbiddenWords.some((word) => finalValue.includes(word));

  return isForbidden ? ValidateForbiddenWordsErrorType.containsForbiddenWords : null;
};
