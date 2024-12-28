import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getModel } from '@/lib/supabase'

interface ModelPageProps {
  params: {
    id: string
  }
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
          {Array.isArray(model.features) && model.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>תכונות</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {model.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Pros & Cons */}
          {(Array.isArray(model.pros) && model.pros.length > 0) || 
           (Array.isArray(model.cons) && model.cons.length > 0) ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.isArray(model.pros) && model.pros.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>יתרונות</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {model.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              
              {Array.isArray(model.cons) && model.cons.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>חסרונות</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {model.cons.map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
} 