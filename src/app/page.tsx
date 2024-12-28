import { HeroSection } from "@/components/HeroSection"
import { ComparisonTable } from "@/components/ComparisonTable"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ComparisonTable />
    </main>
  )
} 