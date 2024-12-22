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
      models: {
        Row: {
          id: string
          name: string
          name_english: string
          description: string
          favicon: string
          pricing: 'free' | 'paid' | 'freemium'
          features: string[]
          pros: string[]
          cons: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_english: string
          description: string
          favicon: string
          pricing: 'free' | 'paid' | 'freemium'
          features?: string[]
          pros?: string[]
          cons?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['models']['Insert']>
      }
      // Add other table definitions...
    }
  }
} 