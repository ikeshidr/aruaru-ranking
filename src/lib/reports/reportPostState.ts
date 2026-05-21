export type ReportPostActionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

export const initialReportPostActionState: ReportPostActionState = {
  status: 'idle',
  message: '',
};
