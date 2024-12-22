import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { MainNav } from '@/components/shared/navigation/main-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'מדריך מודלי הבינה המלאכותית',
  description: 'גלה את עולם הבינה המלאכותית דרך מדריך מקיף למודלים, כלים וטכנולוגיות מתקדמות',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-[#1A0B2E]">
            <header className="sticky top-0 z-50 w-full border-b border-[#2A1B3D] bg-[#1A0B2E]/80 backdrop-blur supports-[backdrop-filter]:bg-[#1A0B2E]/60">
              <div className="container flex h-14 items-center">
                <MainNav />
              </div>
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}