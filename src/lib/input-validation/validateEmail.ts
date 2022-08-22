/*
 * Copyright (c) 2019. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { isEmpty, matches } from "validator";
import { Enum, ExtendEnum } from "../../types/types";
import { CommonValidationErrorType } from "./constant/errorType";
import { MAX_EMAIL_LENGTH } from "./constant/numbers";
import { validateLength, ValidateLengthErrorType } from "./validateLength";

export const ValidateEmailErrorType = ExtendEnum(ValidateLengthErrorType, CommonValidationErrorType.invalidFormat);
export type ValidateEmailErrorType = Enum<typeof ValidateEmailErrorType>;

export interface ValidateEmailOptions {
  isRequired?: boolean;
}

export const validateEmail = (value: string, { isRequired = true }: ValidateEmailOptions = {}) => {
  const REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,15}$";
  if (isEmpty(value)) {
    if (!isRequired) {
      return null;
    }
    return ValidateEmailErrorType.empty;
  }
  if (!matches(value, REGEX)) {
    return ValidateEmailErrorType.invalidFormat;
  }
  return validateLength(value, { max: MAX_EMAIL_LENGTH });
};
