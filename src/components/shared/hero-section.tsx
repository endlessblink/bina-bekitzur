import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function HeroSection(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden border-b bg-[#1A0B2E]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A0B2E] via-[#271844] to-[#1A0B2E]" />
      <div className="container relative flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-24 md:py-32">
        <div className="flex flex-col gap-6 text-right md:w-1/2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-white">המקום היחידי שתלמדו</span>{" "}
            <span className="bg-gradient-to-r from-[#7127BA] to-[#5B4BB5] bg-clip-text text-transparent">
              בינה מלאכותית
            </span>
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            המטרה שלנו היא לעזור לכם להבין את עולם הבינה המלאכותית, A.I.א, מודלים, כלים, חידושים, רעיונות והכל
            בעברית שוטפת לכם ולמשתמשי הקצה שאתם מפתחים בשבילם.
          </p>
          <div className="flex flex-wrap gap-4 justify-end">
            <Button size="lg" className="bg-[#7127BA] hover:bg-[#5B4BB5]">
              צפו במודלים
              <span aria-hidden="true" className="mr-2">←</span>
            </Button>
            <Button size="lg" variant="outline" className="border-[#7127BA] text-[#7127BA] hover:bg-[#7127BA]/10">
              התחברות לקהילה
            </Button>
          </div>
        </div>
        <div className="relative md:w-1/2">
          <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
            <Image
              src="/hero-image.png"
              alt="AI Hero Image"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
} 