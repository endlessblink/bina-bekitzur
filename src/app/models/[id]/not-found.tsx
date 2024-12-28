import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">המודל לא נמצא</h1>
        <p className="text-lg text-muted-foreground">
          המודל שחיפשת לא נמצא במאגר שלנו. ייתכן שהוא הוסר או שהקישור שגוי.
        </p>
        <Button asChild>
          <Link href="/">
            חזרה לדף הבית
          </Link>
        </Button>
      </div>
    </main>
  )
} 