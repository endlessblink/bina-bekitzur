import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-16">
        <div className="grid gap-8">
          {/* Hero Section */}
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="grid gap-1">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Model Image */}
          <Skeleton className="aspect-video w-full rounded-xl" />

          {/* Description */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[60%]" />
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <ul className="grid gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Skeleton className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" />
                    <Skeleton className="h-4 w-full" />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pros & Cons */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Pros */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                <ul className="grid gap-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Skeleton className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" />
                      <Skeleton className="h-4 w-full" />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Cons */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                <ul className="grid gap-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Skeleton className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" />
                      <Skeleton className="h-4 w-full" />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
} 