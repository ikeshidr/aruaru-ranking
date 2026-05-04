export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          parent_id: string | null;
          type:
            | 'occupation'
            | 'animal'
            | 'region'
            | 'hobby'
            | 'school'
            | 'parenting'
            | 'fishing'
            | 'other';
          name: string;
          slug: string;
          description: string | null;
          icon_url: string | null;
          sort_order: number;
          status: 'active' | 'hidden' | 'archived';
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      posts: {
        Row: {
          id: string;
          category_id: string;
          user_id: string | null;
          anonymous_id: string | null;
          session_id: string | null;
          body: string;
          author_name: string | null;
          status: 'pending' | 'published' | 'hidden' | 'deleted';
          report_count: number;
          aruaru_count: number;
          wakaru_count: number;
          funny_count: number;
          nai_count: number;
          comment_count: number;
          score: number;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      votes: {
        Row: {
          id: string;
          post_id: string;
          user_id: string | null;
          anonymous_id: string | null;
          session_id: string | null;
          vote_hash: string | null;
          vote_type: 'aruaru' | 'wakaru' | 'nai' | 'funny';
          created_at: string;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string | null;
          anonymous_id: string | null;
          session_id: string | null;
          body: string;
          author_name: string | null;
          status: 'published' | 'hidden' | 'deleted';
          report_count: number;
          created_at: string;
          updated_at: string;
        };
      };
      reports: {
        Row: {
          id: string;
          target_type: 'post' | 'comment';
          post_id: string | null;
          comment_id: string | null;
          reporter_user_id: string | null;
          reporter_anonymous_id: string | null;
          reporter_session_id: string | null;
          reason:
            | 'spam'
            | 'abuse'
            | 'discrimination'
            | 'personal_info'
            | 'adult'
            | 'other';
          detail: string | null;
          status: 'open' | 'resolved' | 'ignored';
          handled_by: string | null;
          handled_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
          updated_at: string;
        };
      };
      post_tags: {
        Row: {
          post_id: string;
          tag_id: string;
          created_at: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
