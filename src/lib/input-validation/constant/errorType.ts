/*
 * Copyright (c) 2019-2022. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Enum } from "../../../types/types";

export type CommonValidationErrorType = Enum<typeof CommonValidationErrorType>;
export const CommonValidationErrorType = Enum(
  "empty",
  "lessThanLengthLimit",
  "exceedLengthLimit",
  "invalidFormat",
  "lessThanMinimumValue",
  "exceedMaximumValue",
  "invalidValue",
  "notContainsLetterAndNumber",
  "notContainsUpperCaseAndLowerCase",
  "containsTwoCharactersInArrow",
  "containsBadWords",
  "containsForbiddenWords",
  "containsDecimal",
  "invalidFileExtensions",
  "exceedMaximumFileSize",
  "alreadyUsed"
);

export type ThrownErrorType = Enum<typeof ThrownErrorType>;
export const ThrownErrorType = Enum("invalidOption");
