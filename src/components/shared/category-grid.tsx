import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getCategories } from '@/lib/api'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export async function CategoryGrid(): Promise<React.JSX.Element> {
  const categories = await getCategories()

  if (!categories || categories.length === 0) {
    return (
      <section className="container relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="relative flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight">קטגוריות</h2>
            <p className="text-muted-foreground">
              אין קטגוריות זמינות כרגע
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="container relative py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      <div className="relative flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">קטגוריות</h2>
          <p className="text-muted-foreground">
            גלו את המודלים המובילים בכל תחום
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card className="group relative h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 opacity-0 transition-opacity group-hover:opacity-100" />
                {category.icon_url && (
                  <div className="absolute left-6 top-6 h-12 w-12 overflow-hidden rounded-lg border bg-background/50 p-2 backdrop-blur">
                    <Image
                      src={category.icon_url}
                      alt=""
                      width={32}
                      height={32}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <CardHeader className="relative">
                  <CardTitle className="pt-16">{category.name}</CardTitle>
                  {category.summary && (
                    <CardDescription>{category.summary}</CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 