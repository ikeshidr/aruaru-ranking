export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          group_name: string
          icon_key: string | null
          icon_url: string | null
          id: string
          is_active: boolean
          name: string
          parent_id: string | null
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["category_status"]
          tags: string[]
          title: string
          type: Database["public"]["Enums"]["category_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          group_name?: string
          icon_key?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["category_status"]
          tags?: string[]
          title?: string
          type: Database["public"]["Enums"]["category_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          group_name?: string
          icon_key?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["category_status"]
          tags?: string[]
          title?: string
          type?: Database["public"]["Enums"]["category_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          anonymous_id: string | null
          author_name: string | null
          body: string
          created_at: string
          deleted_at: string | null
          id: string
          ip_hash: string | null
          post_id: string
          report_count: number
          session_id: string | null
          status: string
          updated_at: string
          user_agent_hash: string | null
          user_id: string | null
          visitor_id: string | null
        }
        Insert: {
          anonymous_id?: string | null
          author_name?: string | null
          body: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          ip_hash?: string | null
          post_id: string
          report_count?: number
          session_id?: string | null
          status?: string
          updated_at?: string
          user_agent_hash?: string | null
          user_id?: string | null
          visitor_id?: string | null
        }
        Update: {
          anonymous_id?: string | null
          author_name?: string | null
          body?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          ip_hash?: string | null
          post_id?: string
          report_count?: number
          session_id?: string | null
          status?: string
          updated_at?: string
          user_agent_hash?: string | null
          user_id?: string | null
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_logs: {
        Row: {
          action: string
          actor_user_id: string | null
          created_at: string
          id: string
          note: string | null
          target_id: string
          target_type: string
        }
        Insert: {
          action: string
          actor_user_id?: string | null
          created_at?: string
          id?: string
          note?: string | null
          target_id: string
          target_type: string
        }
        Update: {
          action?: string
          actor_user_id?: string | null
          created_at?: string
          id?: string
          note?: string | null
          target_id?: string
          target_type?: string
        }
        Relationships: []
      }
      post_tags: {
        Row: {
          created_at: string
          post_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          tag_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          anonymous_id: string | null
          approved_at: string | null
          aruaru_count: number
          author_name: string | null
          body: string
          category_id: string
          comment_count: number
          created_at: string
          deleted_at: string | null
          funny_count: number
          id: string
          ip_hash: string | null
          nai_count: number
          published_at: string | null
          rejected_at: string | null
          report_count: number
          score: number
          session_id: string | null
          status: string
          tags: string[]
          updated_at: string
          user_agent_hash: string | null
          user_id: string | null
          visitor_id: string | null
          vote_count: number
          wakaru_count: number
        }
        Insert: {
          anonymous_id?: string | null
          approved_at?: string | null
          aruaru_count?: number
          author_name?: string | null
          body: string
          category_id: string
          comment_count?: number
          created_at?: string
          deleted_at?: string | null
          funny_count?: number
          id?: string
          ip_hash?: string | null
          nai_count?: number
          published_at?: string | null
          rejected_at?: string | null
          report_count?: number
          score?: number
          session_id?: string | null
          status?: string
          tags?: string[]
          updated_at?: string
          user_agent_hash?: string | null
          user_id?: string | null
          visitor_id?: string | null
          vote_count?: number
          wakaru_count?: number
        }
        Update: {
          anonymous_id?: string | null
          approved_at?: string | null
          aruaru_count?: number
          author_name?: string | null
          body?: string
          category_id?: string
          comment_count?: number
          created_at?: string
          deleted_at?: string | null
          funny_count?: number
          id?: string
          ip_hash?: string | null
          nai_count?: number
          published_at?: string | null
          rejected_at?: string | null
          report_count?: number
          score?: number
          session_id?: string | null
          status?: string
          tags?: string[]
          updated_at?: string
          user_agent_hash?: string | null
          user_id?: string | null
          visitor_id?: string | null
          vote_count?: number
          wakaru_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          is_active: boolean
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          is_active?: boolean
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          is_active?: boolean
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          comment_id: string | null
          created_at: string
          detail: string | null
          handled_at: string | null
          handled_by: string | null
          id: string
          post_id: string | null
          reason: Database["public"]["Enums"]["report_reason"]
          reporter_anonymous_id: string | null
          reporter_session_id: string | null
          reporter_user_id: string | null
          status: Database["public"]["Enums"]["report_status"]
          target_type: Database["public"]["Enums"]["report_target_type"]
          updated_at: string
        }
        Insert: {
          comment_id?: string | null
          created_at?: string
          detail?: string | null
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          post_id?: string | null
          reason: Database["public"]["Enums"]["report_reason"]
          reporter_anonymous_id?: string | null
          reporter_session_id?: string | null
          reporter_user_id?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          target_type: Database["public"]["Enums"]["report_target_type"]
          updated_at?: string
        }
        Update: {
          comment_id?: string | null
          created_at?: string
          detail?: string | null
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          post_id?: string | null
          reason?: Database["public"]["Enums"]["report_reason"]
          reporter_anonymous_id?: string | null
          reporter_session_id?: string | null
          reporter_user_id?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          target_type?: Database["public"]["Enums"]["report_target_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          anonymous_id: string | null
          created_at: string
          id: string
          post_id: string
          session_id: string | null
          user_id: string | null
          vote_hash: string | null
          vote_type: Database["public"]["Enums"]["vote_type"]
        }
        Insert: {
          anonymous_id?: string | null
          created_at?: string
          id?: string
          post_id: string
          session_id?: string | null
          user_id?: string | null
          vote_hash?: string | null
          vote_type: Database["public"]["Enums"]["vote_type"]
        }
        Update: {
          anonymous_id?: string | null
          created_at?: string
          id?: string
          post_id?: string
          session_id?: string | null
          user_id?: string | null
          vote_hash?: string | null
          vote_type?: Database["public"]["Enums"]["vote_type"]
        }
        Relationships: [
          {
            foreignKeyName: "votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      vote_post: {
        Args: {
          p_post_id: string
          p_visitor_id: string
        }
        Returns: {
          vote_count: number
          already_voted: boolean
        }[]
      }
    }
    Enums: {
      category_status: "active" | "hidden" | "archived"
      category_type:
        | "occupation"
        | "animal"
        | "region"
        | "hobby"
        | "school"
        | "parenting"
        | "fishing"
        | "other"
      comment_status: "published" | "hidden" | "deleted"
      post_status: "pending" | "published" | "hidden" | "deleted"
      report_reason:
        | "spam"
        | "abuse"
        | "discrimination"
        | "personal_info"
        | "adult"
        | "other"
      report_status: "open" | "resolved" | "ignored"
      report_target_type: "post" | "comment"
      vote_type: "aruaru" | "wakaru" | "nai" | "funny"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      category_status: ["active", "hidden", "archived"],
      category_type: [
        "occupation",
        "animal",
        "region",
        "hobby",
        "school",
        "parenting",
        "fishing",
        "other",
      ],
      comment_status: ["published", "hidden", "deleted"],
      post_status: ["pending", "published", "hidden", "deleted"],
      report_reason: [
        "spam",
        "abuse",
        "discrimination",
        "personal_info",
        "adult",
        "other",
      ],
      report_status: ["open", "resolved", "ignored"],
      report_target_type: ["post", "comment"],
      vote_type: ["aruaru", "wakaru", "nai", "funny"],
    },
  },
} as const
