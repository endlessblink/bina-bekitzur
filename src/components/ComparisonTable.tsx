"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const mainCategories = [
  { id: 1, name: "מערכות שפתיות", count: 1 },
  { id: 2, name: "הקראה", count: 1 },
  { id: 3, name: "יצירת מוזיקה", count: 1 },
  { id: 4, name: "יצירת וידאו", count: 2 },
  { id: 5, name: "מודל שפה", count: 2 }
]

const subCategories = [
  "שיחה",
  "כתיבה",
  "תכנות",
  "תרגום",
  "מחקר",
  "שאלות ותשובות",
  "סיכום",
  "ניתוח טקסט",
]

const models = [
  {
    id: "chatgpt",
    mainCategory: "מערכות שפתיות",
    category: "שיחה",
    features: [
      "יכולת שיחה טבעית",
      "תמיכה בשפות רבות",
      "הבנת הקשר"
    ],
    provider: "OpenAI",
    model: "ChatGPT",
    hasApi: true,
    tags: ["שיחה", "כתיבה", "תכנות"]
  },
  {
    id: "claude",
    mainCategory: "מערכות שפתיות",
    category: "שיחה",
    features: [
      "יכולת שיחה מתקדמת",
      "הבנת טקסט מורכב",
      "תמיכה בקוד"
    ],
    provider: "Anthropic",
    model: "Claude",
    hasApi: true,
    tags: ["שיחה", "מחקר", "תכנות"]
  },
  {
    id: "gemini",
    mainCategory: "מערכות שפתיות",
    category: "שיחה",
    features: [
      "הבנת תמונות",
      "יכולות מולטימודליות", 
      "אינטגרציה עם שירותי גוגל"
    ],
    provider: "Google",
    model: "Gemini",
    hasApi: true,
    tags: ["שיחה", "ניתוח טקסט", "תרגום"]
  }
]

export function ComparisonTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showApiOnly, setShowApiOnly] = useState(false)

  const filteredModels = models.filter(model => {
    const matchesSearch = 
      model.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.features.some(feature => 
        feature.toLowerCase().includes(searchQuery.toLowerCase())
      )
    
    const matchesMainCategory = !selectedMainCategory || model.mainCategory === selectedMainCategory
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => model.tags.includes(tag))
    const matchesApi = !showApiOnly || model.hasApi

    return matchesSearch && matchesMainCategory && matchesTags && matchesApi
  })

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold text-center mb-12 text-white">השוואת מודלים</h2>
      
      {/* Filters */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col gap-4">
          {/* Search and API Toggle */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="חיפוש מודלים..."
                className="bg-[#1A1B1E] border-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant={showApiOnly ? "default" : "outline"}
              onClick={() => setShowApiOnly(!showApiOnly)}
              className="min-w-[140px]"
            >
              רק מודלים עם API
            </Button>
          </div>

          {/* Main Categories */}
          <div className="flex flex-wrap gap-2">
            {mainCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedMainCategory === category.name ? "default" : "outline"}
                onClick={() => setSelectedMainCategory(
                  selectedMainCategory === category.name ? null : category.name
                )}
                className="text-sm"
              >
                {category.name}
                <span className="mr-2 text-xs bg-gray-700 px-1.5 py-0.5 rounded-full">
                  {category.count}
                </span>
              </Button>
            ))}
          </div>

          {/* Sub Categories / Tags */}
          <div className="flex flex-wrap gap-2 border-t border-gray-800 pt-4">
            {subCategories.map((tag) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                onClick={() => toggleTag(tag)}
                className="text-sm"
                size="sm"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-xl bg-[#1A1B1E] border border-gray-800">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#1A1B1E]/80">
                <th className="py-5 px-8 text-right font-bold text-white/90">קטגוריה</th>
                <th className="py-5 px-8 text-right font-bold text-white/90">יכולות עיקריות</th>
                <th className="py-5 px-8 text-right font-bold text-white/90">ספק</th>
                <th className="py-5 px-8 text-right font-bold text-white/90">מודל</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredModels.map((model, index) => (
                <tr 
                  key={index} 
                  className="transition-colors hover:bg-gray-800/30"
                >
                  <td className="py-5 px-8">
                    <div className="text-white/80">{model.mainCategory}</div>
                    <div className="text-sm text-gray-500 mt-1">{model.category}</div>
                  </td>
                  <td className="py-5 px-8">
                    <ul className="space-y-2.5">
                      {model.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-gray-300">
                          <span className="text-[#7127BA]">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-5 px-8 text-gray-400">{model.provider}</td>
                  <td className="py-5 px-8">
                    <Link href={`/models/${model.id}`} className="font-medium text-[#7127BA] hover:text-[#8A3FD9] transition-colors">
                      {model.model}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 