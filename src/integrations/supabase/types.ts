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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          bio: string | null
          content_type: string
          created_at: string
          heading: string | null
          id: string
          image: string | null
          item_index: number
          mission: string | null
          name: string | null
          paragraphs: string[] | null
          role: string | null
          subtitle: string | null
          text: string | null
          updated_at: string
          vision: string | null
          year: string | null
        }
        Insert: {
          bio?: string | null
          content_type: string
          created_at?: string
          heading?: string | null
          id?: string
          image?: string | null
          item_index?: number
          mission?: string | null
          name?: string | null
          paragraphs?: string[] | null
          role?: string | null
          subtitle?: string | null
          text?: string | null
          updated_at?: string
          vision?: string | null
          year?: string | null
        }
        Update: {
          bio?: string | null
          content_type?: string
          created_at?: string
          heading?: string | null
          id?: string
          image?: string | null
          item_index?: number
          mission?: string | null
          name?: string | null
          paragraphs?: string[] | null
          role?: string | null
          subtitle?: string | null
          text?: string | null
          updated_at?: string
          vision?: string | null
          year?: string | null
        }
        Relationships: []
      }
      admin_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          id: string
          name: string
          preferences: Json | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          preferences?: Json | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          preferences?: Json | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          body: string | null
          category_id: string | null
          created_at: string
          excerpt: string | null
          featured: boolean | null
          id: string
          image: string | null
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          category_id?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          category_id?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      business_contact: {
        Row: {
          additional_info: string | null
          address: string | null
          content_type: string
          created_at: string
          email: string | null
          google_maps_url: string | null
          id: string
          item_index: number
          office_hours: Json | null
          phone: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          additional_info?: string | null
          address?: string | null
          content_type?: string
          created_at?: string
          email?: string | null
          google_maps_url?: string | null
          id?: string
          item_index?: number
          office_hours?: Json | null
          phone?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          additional_info?: string | null
          address?: string | null
          content_type?: string
          created_at?: string
          email?: string | null
          google_maps_url?: string | null
          id?: string
          item_index?: number
          office_hours?: Json | null
          phone?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      consultation_bookings: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          preferred_date: string
          service: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          preferred_date: string
          service: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          preferred_date?: string
          service?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          subject?: string
        }
        Relationships: []
      }
      home_content: {
        Row: {
          content_type: string
          created_at: string
          description: string | null
          heading: string | null
          id: string
          item_index: number
          label: string | null
          subtitle: string | null
          text: string | null
          title: string | null
          updated_at: string
          value: string | null
        }
        Insert: {
          content_type: string
          created_at?: string
          description?: string | null
          heading?: string | null
          id?: string
          item_index?: number
          label?: string | null
          subtitle?: string | null
          text?: string | null
          title?: string | null
          updated_at?: string
          value?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string
          description?: string | null
          heading?: string | null
          id?: string
          item_index?: number
          label?: string | null
          subtitle?: string | null
          text?: string | null
          title?: string | null
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      services_content: {
        Row: {
          content_type: string
          created_at: string
          description: string | null
          features: string[] | null
          id: string
          image: string | null
          item_index: number
          service_id: string
          tagline: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content_type?: string
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          image?: string | null
          item_index?: number
          service_id: string
          tagline?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content_type?: string
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          image?: string | null
          item_index?: number
          service_id?: string
          tagline?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  public: {
    Enums: {},
  },
} as const
