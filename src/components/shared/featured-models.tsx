import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedModels } from '@/lib/api'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export async function FeaturedModels(): Promise<React.JSX.Element> {
  const models = await getFeaturedModels()

  if (!models || models.length === 0) {
    return (
      <section className="container relative py-16">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background" />
        <div className="relative flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight">מודלים מובילים</h2>
            <p className="text-muted-foreground">
              אין מודלים מובילים זמינים כרגע
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="container relative py-16">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background" />
      <div className="relative flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">מודלים מובילים</h2>
          <p className="text-muted-foreground">
            המודלים הפופולריים והחדשניים ביותר
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((model) => (
            <Link key={model.id} href={`/models/${model.id}`}>
              <Card className="group relative h-full overflow-hidden transition-colors hover:bg-muted/50">
                {model.image_url && (
                  <div className="aspect-video relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <Image
                      src={model.image_url}
                      alt={model.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="line-clamp-1">{model.name}</CardTitle>
                    <Badge variant={
                      model.access_type === 'free' ? 'default' :
                      model.access_type === 'paid' ? 'secondary' : 'outline'
                    }>
                      {model.access_type === 'free' ? 'חינם' :
                       model.access_type === 'paid' ? 'בתשלום' : 'משולב'}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {model.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{model.provider}</span>
                    {model.category && (
                      <>
                        <span>•</span>
                        <span>{model.category.name}</span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 