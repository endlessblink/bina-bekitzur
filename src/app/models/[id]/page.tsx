import * as React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ModelPageProps {
  params: {
    id: string
  }
}

async function getModel(id: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('models')
    .select(`
      *,
      category:categories(name)
    `)
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function ModelPage({ params }: ModelPageProps) {
  const model = await getModel(params.id)

  if (!model) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-16">
        <div className="grid gap-8">
          {/* Hero Section */}
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="grid gap-1">
                <h1 className="text-3xl font-bold tracking-tight">{model.name}</h1>
                {model.name_english && (
                  <p className="text-lg text-muted-foreground">{model.name_english}</p>
                )}
              </div>
              <Badge variant={
                model.access_type === 'free' ? 'default' :
                model.access_type === 'paid' ? 'secondary' : 'outline'
              }>
                {model.access_type === 'free' ? 'חינם' :
                 model.access_type === 'paid' ? 'בתשלום' : 'משולב'}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{model.provider}</span>
              {model.category && (
                <>
                  <span>•</span>
                  <span>{model.category.name}</span>
                </>
              )}
            </div>
          </div>

          {/* Model Image */}
          {model.image_url && (
            <div className="aspect-video relative overflow-hidden rounded-xl border bg-muted">
              <Image
                src={model.image_url}
                alt={model.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>תיאור</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{model.description}</p>
            </CardContent>
          </Card>

          {/* Features */}
          {model.features && model.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>יכולות עיקריות</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-4">
                  {model.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Pros & Cons */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Pros */}
            {model.pros && model.pros.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>יתרונות</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-4">
                    {model.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Cons */}
            {model.cons && model.cons.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>חסרונות</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-4">
                    {model.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-destructive flex-shrink-0" />
                        <span className="text-muted-foreground">{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 