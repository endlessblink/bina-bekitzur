export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          name_english: string | null
          icon_url: string | null
          summary: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_english?: string | null
          icon_url?: string | null
          summary?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_english?: string | null
          icon_url?: string | null
          summary?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ai_models: {
        Row: {
          id: string
          name: string
          name_english: string | null
          description: string | null
          features: string[]
          pros: string[] | null
          cons: string[] | null
          provider: string
          category_id: string
          access_type: 'free' | 'paid' | 'mixed'
          image_url: string | null
          is_featured: boolean
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_english?: string | null
          description?: string | null
          features: string[]
          pros?: string[] | null
          cons?: string[] | null
          provider: string
          category_id: string
          access_type?: 'free' | 'paid' | 'mixed'
          image_url?: string | null
          is_featured?: boolean
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_english?: string | null
          description?: string | null
          features?: string[]
          pros?: string[] | null
          cons?: string[] | null
          provider?: string
          category_id?: string
          access_type?: 'free' | 'paid' | 'mixed'
          image_url?: string | null
          is_featured?: boolean
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
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
  }
} 