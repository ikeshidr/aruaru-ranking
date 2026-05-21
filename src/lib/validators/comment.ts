import { UUID_PATTERN, countCharacters, normalizeText } from './common';

export const MIN_COMMENT_BODY_LENGTH = 1;
export const MAX_COMMENT_BODY_LENGTH = 300;
export const MAX_COMMENT_AUTHOR_NAME_LENGTH = 40;
export const DEFAULT_COMMENT_AUTHOR_NAME = '匿名さん';

export type SubmitCommentValues = {
  postId: string;
  body: string;
  authorName: string;
};

export type SubmitCommentFieldErrors = Partial<Record<keyof SubmitCommentValues, string>>;

export type SubmitCommentValidationResult =
  | {
      success: true;
      data: SubmitCommentValues;
    }
  | {
      success: false;
      values: SubmitCommentValues;
      fieldErrors: SubmitCommentFieldErrors;
    };

export function validateSubmitComment(values: SubmitCommentValues): SubmitCommentValidationResult {
  const normalizedValues: SubmitCommentValues = {
    postId: normalizeText(values.postId),
    body: normalizeText(values.body),
    authorName: normalizeText(values.authorName),
  };

  const fieldErrors: SubmitCommentFieldErrors = {};
  const bodyLength = countCharacters(normalizedValues.body);
  const authorNameLength = countCharacters(normalizedValues.authorName);

  if (!normalizedValues.postId || !UUID_PATTERN.test(normalizedValues.postId)) {
    fieldErrors.postId = 'コメント対象の投稿が見つかりません。';
  }

  if (bodyLength < MIN_COMMENT_BODY_LENGTH || bodyLength > MAX_COMMENT_BODY_LENGTH) {
    fieldErrors.body = `コメントは${MIN_COMMENT_BODY_LENGTH}〜${MAX_COMMENT_BODY_LENGTH}文字で入力してください。`;
  }

  if (authorNameLength > MAX_COMMENT_AUTHOR_NAME_LENGTH) {
    fieldErrors.authorName = `お名前は${MAX_COMMENT_AUTHOR_NAME_LENGTH}文字以内で入力してください。`;
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
      authorName: normalizedValues.authorName || DEFAULT_COMMENT_AUTHOR_NAME,
    },
  };
}
