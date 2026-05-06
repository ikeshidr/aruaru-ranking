export const MIN_POST_BODY_LENGTH = 10;
export const MAX_POST_BODY_LENGTH = 120;
export const MAX_POST_AUTHOR_NAME_LENGTH = 30;
export const DEFAULT_AUTHOR_NAME = '匿名さん';

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type SubmitPostValues = {
  categoryId: string;
  body: string;
  authorName: string;
};

export type SubmitPostFieldErrors = Partial<Record<keyof SubmitPostValues, string>>;

export type SubmitPostValidationResult =
  | {
      success: true;
      data: SubmitPostValues;
    }
  | {
      success: false;
      values: SubmitPostValues;
      fieldErrors: SubmitPostFieldErrors;
    };

function countCharacters(value: string) {
  return Array.from(value).length;
}

function normalizeText(value: string) {
  return value.trim();
}

export function validateSubmitPost(values: SubmitPostValues): SubmitPostValidationResult {
  const normalizedValues: SubmitPostValues = {
    categoryId: normalizeText(values.categoryId),
    body: normalizeText(values.body),
    authorName: normalizeText(values.authorName),
  };

  const fieldErrors: SubmitPostFieldErrors = {};
  const bodyLength = countCharacters(normalizedValues.body);
  const authorNameLength = countCharacters(normalizedValues.authorName);

  if (!normalizedValues.categoryId || !UUID_PATTERN.test(normalizedValues.categoryId)) {
    fieldErrors.categoryId = 'カテゴリーを選択してください。';
  }

  if (bodyLength < MIN_POST_BODY_LENGTH || bodyLength > MAX_POST_BODY_LENGTH) {
    fieldErrors.body = `あるある本文は${MIN_POST_BODY_LENGTH}〜${MAX_POST_BODY_LENGTH}文字で入力してください。`;
  }

  if (authorNameLength > MAX_POST_AUTHOR_NAME_LENGTH) {
    fieldErrors.authorName = `投稿者名は${MAX_POST_AUTHOR_NAME_LENGTH}文字以内で入力してください。`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      values: normalizedValues,
      fieldErrors,
    };
  }

  return {
    success: true,
    data: {
      ...normalizedValues,
      authorName: normalizedValues.authorName || DEFAULT_AUTHOR_NAME,
    },
  };
}
