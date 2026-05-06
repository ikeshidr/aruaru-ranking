import type { SubmitCommentFieldErrors } from '@/lib/validators/comment';

export type SubmitCommentActionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  fieldErrors: SubmitCommentFieldErrors;
  values: {
    postId: string;
    body: string;
    authorName: string;
  };
};

export const initialSubmitCommentActionState: SubmitCommentActionState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
  values: {
    postId: '',
    body: '',
    authorName: '',
  },
};
