'use server';

import { createClient } from '@/lib/supabase/server';
import { getOrCreateVisitorId } from '@/lib/visitor/visitor-id';
import { UUID_PATTERN } from '@/lib/validators/common';
import type { ReportPostActionState } from '@/lib/reports/reportPostState';

const GENERIC_REPORT_ERROR = '通報の送信に失敗しました。時間をおいて再度お試しください。';
const ALREADY_REPORTED_MESSAGE = 'この投稿はすでに通報済みです。';

// Subset of the existing report_reason enum exposed in the UI.
// Full enum: 'spam' | 'abuse' | 'discrimination' | 'personal_info' | 'adult' | 'other'
const VALID_REASONS = ['spam', 'abuse', 'personal_info', 'other'] as const;
type ReportReason = (typeof VALID_REASONS)[number];

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

function isDuplicateError(error: { code?: string }) {
  return error.code === '23505';
}

export async function reportPostAction(
  _previousState: ReportPostActionState,
  formData: FormData,
): Promise<ReportPostActionState> {
  const postId = getFormValue(formData, 'postId');
  const reason = getFormValue(formData, 'reason');

  if (!UUID_PATTERN.test(postId)) {
    return { status: 'error', message: '通報対象の投稿が見つかりません。' };
  }

  if (!(VALID_REASONS as readonly string[]).includes(reason)) {
    return { status: 'error', message: '通報理由を選択してください。' };
  }

  const visitorId = await getOrCreateVisitorId();
  const supabase = await createClient();

  const { error } = await supabase.from('reports').insert({
    target_type: 'post',
    post_id: postId,
    reporter_anonymous_id: visitorId,
    reason: reason as ReportReason,
  });

  if (error) {
    console.error('Failed to insert report', error);
    return {
      status: 'error',
      message: isDuplicateError(error) ? ALREADY_REPORTED_MESSAGE : GENERIC_REPORT_ERROR,
    };
  }

  return { status: 'success', message: '通報を受け付けました。ご協力ありがとうございます。' };
}
