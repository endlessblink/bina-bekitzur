"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { getModels } from '@/lib/supabase'

interface Model {
  id: string
  name: string
  name_english?: string
  description?: string
  features: string[] | null
  provider: string
  category: {
    id: string
    name: string
  }
  access_type: 'free' | 'paid' | 'mixed'
  tags: string[] | null
}

export function ComparisonTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showApiOnly, setShowApiOnly] = useState(false)
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchModels() {
      const data = await getModels()
      // Parse JSON strings to arrays if needed
      const parsedData = data.map(model => ({
        ...model,
        features: Array.isArray(model.features) ? model.features : [],
        tags: Array.isArray(model.tags) ? model.tags : []
      }))
      setModels(parsedData)
      setLoading(false)
    }

    fetchModels()
  }, [])

  const mainCategories = Array.from(new Set(models.map(model => model.category?.name))).filter(Boolean).map(name => ({
    id: models.find(m => m.category?.name === name)?.category?.id || '',
    name: name || '',
    count: models.filter(m => m.category?.name === name).length
  }))

  const allTags = Array.from(new Set(models.flatMap(model => model.tags || []))).sort()

  const filteredModels = models.filter(model => {
    const matchesSearch = 
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.name_english?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = !selectedMainCategory || model.category?.name === selectedMainCategory

    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => model.tags?.includes(tag))

    const matchesApi = !showApiOnly || model.access_type === 'free'

    return matchesSearch && matchesCategory && matchesTags && matchesApi
  })

  if (loading) {
    return <div className="p-8 text-center">טוען...</div>
  }

  return (
    <div className="container py-8">
      <div className="rounded-xl border bg-card p-6 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-white">השוואת מודלים</h2>
        
        {/* Filters */}
        <div className="mb-6 grid gap-4">
          <Input
            placeholder="חיפוש מודלים..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          
          <div className="flex flex-wrap gap-2">
            {mainCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedMainCategory === category.name ? "default" : "outline"}
                onClick={() => setSelectedMainCategory(
                  selectedMainCategory === category.name ? null : category.name
                )}
                className="h-8"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                onClick={() => setSelectedTags(
                  selectedTags.includes(tag)
                    ? selectedTags.filter(t => t !== tag)
                    : [...selectedTags, tag]
                )}
                className="h-8"
              >
                {tag}
              </Button>
            ))}
          </div>

          <Button
            variant={showApiOnly ? "default" : "outline"}
            onClick={() => setShowApiOnly(!showApiOnly)}
            className="w-fit"
          >
            הצג רק מודלים חינמיים
          </Button>
        </div>

        {/* Results */}
        <div className="grid gap-4">
          {filteredModels.map((model) => (
            <Link
              key={model.id}
              href={`/models/${model.id}`}
              className="group relative rounded-lg border bg-card p-4 transition-colors hover:bg-accent/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{model.name}</h3>
                  {model.name_english && (
                    <p className="text-sm text-muted-foreground">{model.name_english}</p>
                  )}
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{model.provider}</span>
                    {model.category && (
                      <>
                        <span>•</span>
                        <span>{model.category.name}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-sm">
                  {model.access_type === 'free' && (
                    <span className="rounded-full bg-green-500/10 px-2 py-1 text-green-500">חינמי</span>
                  )}
                  {model.access_type === 'paid' && (
                    <span className="rounded-full bg-blue-500/10 px-2 py-1 text-blue-500">בתשלום</span>
                  )}
                  {model.access_type === 'mixed' && (
                    <span className="rounded-full bg-purple-500/10 px-2 py-1 text-purple-500">משולב</span>
                  )}
                </div>
              </div>
              {model.features && model.features.length > 0 && (
                <ul className="mt-4 grid gap-2">
                  {model.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 