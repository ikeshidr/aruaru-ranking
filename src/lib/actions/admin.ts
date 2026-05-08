'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { AdminLoginActionState } from '@/lib/admin/adminActionState';

const GENERIC_ADMIN_LOGIN_ERROR_MESSAGE = 'メールアドレスまたはパスワードを確認してください。';

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/admin/login');
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');

  if (adminError) {
    console.error('Failed to verify admin user', adminError);
    redirect('/admin/login');
  }

  if (!isAdmin) {
    await supabase.auth.signOut();
    redirect('/admin/login');
  }

  return { supabase, user };
}

export async function adminLoginAction(
  _previousState: AdminLoginActionState,
  formData: FormData,
): Promise<AdminLoginActionState> {
  const email = getFormValue(formData, 'email');
  const password = getFormValue(formData, 'password');

  if (!email || !password) {
    return {
      status: 'error',
      message: 'メールアドレスとパスワードを入力してください。',
      values: { email },
    };
  }

  const supabase = await createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError) {
    console.error('Failed admin sign in', signInError);

    return {
      status: 'error',
      message: GENERIC_ADMIN_LOGIN_ERROR_MESSAGE,
      values: { email },
    };
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');

  if (adminError) {
    console.error('Failed to verify signed-in admin', adminError);
    await supabase.auth.signOut();

    return {
      status: 'error',
      message: GENERIC_ADMIN_LOGIN_ERROR_MESSAGE,
      values: { email },
    };
  }

  if (!isAdmin) {
    await supabase.auth.signOut();

    return {
      status: 'error',
      message: '管理者権限がありません。',
      values: { email },
    };
  }

  redirect('/admin');
}

export async function adminLogoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

export async function approvePostAction(formData: FormData) {
  const postId = getFormValue(formData, 'postId');

  if (!postId) {
    console.error('Missing post id for approve action');
    return;
  }

  const { supabase, user } = await requireAdmin();
  const { error: updateError } = await supabase
    .from('posts')
    .update({
      status: 'approved',
      approved_at: new Date().toISOString(),
      rejected_at: null,
    })
    .eq('id', postId)
    .eq('status', 'pending')
    .is('deleted_at', null);

  if (updateError) {
    console.error('Failed to approve post', updateError);
    return;
  }

  const { error: logError } = await supabase.from('moderation_logs').insert({
    target_type: 'post',
    target_id: postId,
    action: 'approve',
    actor_user_id: user.id,
  });

  if (logError) {
    console.error('Failed to record approve moderation log', logError);
  }

  revalidatePath('/admin');
  revalidatePath('/');
  revalidatePath('/ranking');
  revalidatePath('/categories', 'layout');
}


export async function rejectPostAction(formData: FormData) {
  const postId = getFormValue(formData, 'postId');

  if (!postId) {
    console.error('Missing post id for reject action');
    return;
  }

  const { supabase, user } = await requireAdmin();
  const { error: updateError } = await supabase
    .from('posts')
    .update({
      status: 'rejected',
      approved_at: null,
      rejected_at: new Date().toISOString(),
    })
    .eq('id', postId)
    .eq('status', 'pending')
    .is('deleted_at', null);

  if (updateError) {
    console.error('Failed to reject post', updateError);
    return;
  }

  const { error: logError } = await supabase.from('moderation_logs').insert({
    target_type: 'post',
    target_id: postId,
    action: 'reject',
    actor_user_id: user.id,
  });

  if (logError) {
    console.error('Failed to record reject moderation log', logError);
  }

  revalidatePath('/admin');
}
