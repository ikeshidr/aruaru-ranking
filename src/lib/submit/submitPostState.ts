import type { SubmitPostFieldErrors } from '@/lib/validators/post';

export type SubmitPostActionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  fieldErrors: SubmitPostFieldErrors;
  values: {
    categoryId: string;
    body: string;
    authorName: string;
  };
};

export const initialSubmitPostActionState: SubmitPostActionState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
  values: {
    categoryId: '',
    body: '',
    authorName: '',
  },
};
