'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function MainNav() {
  return (
    <div className="flex flex-1 items-center justify-between px-4">
      <Link href="/" className="flex items-center group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10 blur-xl rounded-full transform scale-125" />
        <span className="text-4xl font-bold bg-gradient-to-r from-[#D4A5FF] via-[#B57BFF] to-[#9B4FE9] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(139,92,246,0.5)] relative z-10 py-2 px-1">
          בינה, בקיצור
        </span>
      </Link>
      <nav className="flex items-center gap-8 mx-8">
        <Link 
          href="/models" 
          className="text-base font-medium text-muted-foreground transition-colors hover:text-white"
        >
          מודלים
        </Link>
        <Link 
          href="/tutorials" 
          className="text-base font-medium text-muted-foreground transition-colors hover:text-white"
        >
          מדריכים
        </Link>
        <Link 
          href="/journeys" 
          className="text-base font-medium text-muted-foreground transition-colors hover:text-white"
        >
          מסלולי למידה
        </Link>
        <Link 
          href="/blog" 
          className="text-base font-medium text-muted-foreground transition-colors hover:text-white"
        >
          בלוג
        </Link>
      </nav>
      <div className="flex items-center">
        <Button 
          className="text-base font-medium bg-gradient-to-r from-[#8A3FD9] to-[#7127BA] hover:from-[#9B4FE9] hover:to-[#8A3FD9] text-white shadow-lg shadow-purple-500/20 min-w-[100px] border border-purple-400/20"
        >
          ניהול
        </Button>
      </div>
    </div>
  )
} 