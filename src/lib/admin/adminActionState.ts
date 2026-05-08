export type AdminLoginActionState = {
  status: 'idle' | 'error';
  message: string;
  values: {
    email: string;
  };
};

export const initialAdminLoginActionState: AdminLoginActionState = {
  status: 'idle',
  message: '',
  values: {
    email: '',
  },
};
