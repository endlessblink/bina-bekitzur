"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getModels } from "@/lib/supabase"

interface Model {
  id: string
  name: string
  description?: string
  features: string
  category: string
  pros?: string
  cons?: string
  pricing_model?: string
  tags?: string[]
}

const CATEGORIES = [
  {
    id: "tts",
    title: "הקראה",
    description: "מודלים להקראת טקסט",
    icon: "🗣️",
    iconBg: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: "video",
    title: "וידאו",
    description: "מודלים ליצירת וידאו",
    icon: "🎥",
    iconBg: "from-orange-500/20 to-red-500/20"
  },
  {
    id: "music",
    title: "מוזיקה",
    description: "מודלים ליצירת מוזיקה",
    icon: "🎵",
    iconBg: "from-pink-500/20 to-red-500/20"
  },
  {
    id: "language",
    title: "שפה",
    description: "מודלים לעיבוד שפה טבעית",
    icon: "💭",
    iconBg: "from-blue-500/20 to-purple-500/20"
  }
]

export function CategoryGrid() {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchModels() {
      try {
        const data = await getModels()
        console.log('Raw data from Supabase:', data)
        
        if (Array.isArray(data)) {
          const parsedData = data.map(model => ({
            id: model.id || '',
            name: model.name || '',
            description: model.description || '',
            features: model.features || '',
            category: model.category || '',
            pros: model.pros || '',
            cons: model.cons || '',
            pricing_model: model.pricing_model || '',
            tags: Array.isArray(model.tags) ? [...model.tags] : []
          }))
          setModels(parsedData)
        } else {
          setError('Invalid data format received')
        }
      } catch (err) {
        console.error('Error fetching models:', err)
        setError('Failed to load models')
      } finally {
        setLoading(false)
      }
    }

    fetchModels()
  }, [])

  if (loading) {
    return <div className="text-center">טוען...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  // Group models by category
  const categoriesWithModels = CATEGORIES.map(category => {
    const categoryModels = models.filter(model => {
      const categoryName = model.category?.toLowerCase() || ""
      console.log(`Checking model ${model.name} with category ${categoryName}`)
      
      // Match both Hebrew and English category names
      if (category.id === "tts") {
        return categoryName.includes("הקראה") || categoryName.includes("tts") || categoryName.includes("text to speech")
      }
      if (category.id === "video") {
        return categoryName.includes("וידאו") || categoryName.includes("video")
      }
      if (category.id === "music") {
        return categoryName.includes("מוזיקה") || categoryName.includes("music")
      }
      if (category.id === "language") {
        return categoryName.includes("שפה") || categoryName.includes("language") || categoryName.includes("nlp")
      }
      return false
    })

    console.log(`Category ${category.title} has ${categoryModels.length} models:`, categoryModels)
    return {
      ...category,
      models: categoryModels
    }
  })

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {categoriesWithModels.map((category) => (
        <Card key={category.id} className="group relative overflow-hidden bg-[#1A0B2E] p-6 transition-all duration-300 hover:bg-[#2A1B3D]">
          <div className={`absolute inset-0 bg-gradient-to-r ${category.iconBg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
          <div className="relative flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-2xl font-semibold text-transparent">
                  {category.title}
                </h2>
                <span className="text-2xl">{category.icon}</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              {category.description}
            </p>
            <div className="space-y-4">
              {category.models.length > 0 ? (
                <>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {category.models[0].features?.split('\n').map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1 text-purple-400">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {category.models.map((model) => (
                      <Link key={model.id} href={`/models/${model.id}`}>
                        <Badge 
                          variant="outline" 
                          className="cursor-pointer bg-[#2A1B3D] hover:bg-[#3A2B4D]"
                        >
                          <span>{model.name}</span>
                          {model.pricing_model === 'free' && (
                            <span className="mr-1 text-xs text-green-400">• חינם</span>
                          )}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500">אין מודלים זמינים כרגע</p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 