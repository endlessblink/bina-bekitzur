import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
})

// Fetch all models
export async function getModels() {
  const { data, error } = await supabase
    .from('ai_models')
    .select(`
      *,
      category:categories(id, name)
    `)
    .order('name')

  if (error) {
    console.error('Error fetching models:', error)
    return []
  }

  return data || []
}

// Fetch a single model by ID
export async function getModel(id: string) {
  const { data, error } = await supabase
    .from('ai_models')
    .select(`
      *,
      category:categories(id, name)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching model:', error)
    return null
  }

  return data
}

export async function getCategories() {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return categories
}

export async function getFeaturedModels() {
  const { data: models, error } = await supabase
    .from('ai_models')
    .select(`
      *,
      category:categories(id, name)
    `)
    .eq('is_featured', true)
    .order('name')
  
  if (error) {
    console.error('Error fetching featured models:', error)
    return []
  }

  return models
} 