import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey)

// Fetch all models with error handling
export async function getModels() {
  const { data, error } = await supabase
    .from('ai_models')
    .select('*')
    .order('name')
  
  if (error) throw error
  
  return data.map(model => ({
    ...model,
    pros: Array.isArray(model.pros) ? model.pros : [],
    cons: Array.isArray(model.cons) ? model.cons : []
  }))
}

// Fetch a single model by ID with error handling
export async function getModel(id: string) {
  const { data, error } = await supabase
    .from('ai_models')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export async function createModel(model: any) {
  const { data, error } = await supabase
    .from('ai_models')
    .insert(model)
    .select()
  
  if (error) throw error
  return data
}

export async function updateModel(id: string, updates: any) {
  const modelData = {
    ...updates,
    pros: Array.isArray(updates.pros) ? updates.pros : [],
    cons: Array.isArray(updates.cons) ? updates.cons : []
  }

  const { data, error } = await supabase
    .from('ai_models')
    .update(modelData)
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data
}

export async function deleteModel(id: string) {
  const { error } = await supabase
    .from('ai_models')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
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