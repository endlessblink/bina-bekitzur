export interface Model {
  id: string
  name: string
  name_english: string | null
  description: string
  category_id: string
  featured: boolean
  image_url: string | null
  provider: string
  access_type: 'free' | 'paid' | 'mixed'
  created_at: string
  updated_at: string
  category?: {
    name: string
  }
} 