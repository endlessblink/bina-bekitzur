import { createServerSupabaseClient } from '@/lib/supabase'
import { unstable_cache } from 'next/cache'

export const getCategories = unstable_cache(
  async () => {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      
      if (error) {
        console.error('Error fetching categories:', error)
        return []
      }
      
      return data
    } catch (error) {
      console.error('Error in getCategories:', error)
      return []
    }
  },
  ['categories'],
  {
    revalidate: 60,
    tags: ['categories']
  }
)

export const getFeaturedModels = unstable_cache(
  async () => {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase
        .from('models')
        .select(`
          *,
          category:categories(name)
        `)
        .eq('featured', true)
        .limit(6)
      
      if (error) {
        console.error('Error fetching featured models:', error)
        return []
      }
      
      return data
    } catch (error) {
      console.error('Error in getFeaturedModels:', error)
      return []
    }
  },
  ['featured-models'],
  {
    revalidate: 60,
    tags: ['models']
  }
) 