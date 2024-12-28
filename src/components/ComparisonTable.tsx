"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { getModels } from '@/lib/supabase'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'

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

export function ComparisonTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null)
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
            ...model,
            features: model.features || ''
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

  const mainCategories = Array.from(new Set(models.map(model => model.category))).filter(Boolean).map(name => ({
    id: name,
    name: name,
    count: models.filter(m => m.category === name).length
  }))

  const filteredModels = models.filter(model => {
    const matchesSearch = 
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = !selectedMainCategory || model.category === selectedMainCategory

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return <div className="p-8 text-center">טוען...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }

  return (
    <div className="container py-16">
      <div className="rounded-xl border bg-[#0C0C0C] p-6 shadow-lg">
        <h2 className="mb-6 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-2xl font-bold text-transparent">
          השוואת מודלים
        </h2>
        
        {/* Filters */}
        <div className="mb-6 grid gap-4">
          <Input
            placeholder="חיפוש מודלים..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm bg-[#1A1A1A] border-[#2A2A2A]"
          />
          
          <div className="flex flex-wrap gap-2">
            {mainCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedMainCategory === category.name ? "default" : "outline"}
                onClick={() => setSelectedMainCategory(
                  selectedMainCategory === category.name ? null : category.name
                )}
                className="h-8 bg-[#1A1A1A] border-[#2A2A2A] hover:bg-[#2A2A2A]"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredModels.map((model) => (
            <Link 
              key={model.id}
              href={`/models/${model.id}`}
            >
              <Card className="group h-full bg-[#1A1A1A] border-[#2A2A2A] p-6 transition-all hover:bg-[#2A2A2A]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white group-hover:text-violet-400">
                        {model.name}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-violet-400" />
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {model.category}
                    </div>
                  </div>
                  {model.pricing_model === 'free' && (
                    <Badge variant="default">חינם</Badge>
                  )}
                </div>

                {model.description && (
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                    {model.description}
                  </p>
                )}

                <div className="mt-6 grid gap-4">
                  {/* Features */}
                  {model.features && (
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-violet-400">תכונות</h4>
                      <div className="text-sm text-muted-foreground">
                        {model.features}
                      </div>
                    </div>
                  )}

                  {/* Pros & Cons */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {model.pros && (
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-green-400">יתרונות</h4>
                        <div className="text-sm text-muted-foreground">
                          {model.pros}
                        </div>
                      </div>
                    )}

                    {model.cons && (
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-red-400">חסרונות</h4>
                        <div className="text-sm text-muted-foreground">
                          {model.cons}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 