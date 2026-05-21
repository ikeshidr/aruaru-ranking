import type { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

function throwQueryError(error: PostgrestError | null, context: string) {
  if (error) {
    console.error(`${context}:`, error);
    throw new Error('データの取得に失敗しました');
  }
}

const CATEGORY_SELECT =
  "id, slug, title, group_name, description, icon_key, tags, sort_order, is_active";

export async function getActiveCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(CATEGORY_SELECT)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  throwQueryError(error, "Failed to fetch active categories");

  return data ?? [];
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(CATEGORY_SELECT)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  throwQueryError(error, "Failed to fetch category by slug");

  return data ?? null;
}
