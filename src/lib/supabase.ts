import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js'
    }
  }
})

// Fetch all models with error handling
export async function getModels() {
  try {
    // First, let's try to get all columns
    const { data, error } = await supabase
      .from('ai_models')
      .select('*')

    if (error) {
      console.error('Error fetching models:', error)
      return []
    }

    // Log the first item to see its structure
    if (Array.isArray(data) && data.length > 0) {
      console.log('First model structure:', data[0])
    }

    return data || []
  } catch (err) {
    console.error('Unexpected error fetching models:', err)
    return []
  }
}

// Fetch a single model by ID with error handling
export async function getModel(id: string) {
  try {
    const { data, error } = await supabase
      .from('ai_models')
      .select(`
        id,
        name,
        description,
        features,
        category:categories(id, name)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching model:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('Unexpected error fetching model:', err)
    return null
  }
}

export async function getCategories() {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return categories
  } catch (err) {
    console.error('Unexpected error fetching categories:', err)
    return []
  }
}

export async function getFeaturedModels() {
  try {
    const { data: models, error } = await supabase
      .from('ai_models')
      .select(`
        id,
        name,
        description,
        features,
        category:categories(id, name)
      `)
      .eq('is_featured', true)
      .order('name')
    
    if (error) {
      console.error('Error fetching featured models:', error)
      return []
    }

    return models
  } catch (err) {
    console.error('Unexpected error fetching featured models:', err)
    return []
  }
} 