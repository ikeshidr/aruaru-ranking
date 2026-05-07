export type VotePostActionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  voteCount: number | null;
};

export const initialVotePostActionState: VotePostActionState = {
  status: 'idle',
  message: '',
  voteCount: null,
};
