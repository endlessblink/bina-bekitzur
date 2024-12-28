import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { CategoryGrid } from './CategoryGrid'

const modelTypes = [
  {
    title: "שפה",
    icon: "👾",
    iconBg: "from-blue-500/20 to-purple-500/20",
    description: "מודלים ליצירת טקסט",
    features: [
      "יכולת שיחה טבעית ואינטראקציה אנושית",
      "תמיכה במגוון שפות ודיאלקטים",
      "יכולות תרגום והבנת הקשר מתקדמות"
    ],
    recommendedModels: [
      { id: "chatgpt", name: "ChatGPT", type: "OpenAI", color: "text-green-400" },
      { id: "claude", name: "Claude", type: "Anthropic", color: "text-purple-400" },
      { id: "gemini", name: "Gemini", type: "Google", color: "text-blue-400" }
    ]
  },
  {
    title: "מוזיקה",
    icon: "🎵",
    iconBg: "from-pink-500/20 to-red-500/20",
    description: "מודלים ליצירת מוזיקה",
    features: [
      "יצירת מנגינות מקוריות בסגנונות שונים",
      "הרמוניזציה והלחנה מתקדמת",
      "המרת קול לכלי נגינה ולהפך"
    ],
    recommendedModels: [
      { id: "musicgen", name: "MusicGen", type: "Meta", color: "text-blue-400" },
      { id: "audiocraft", name: "AudioCraft", type: "Meta", color: "text-blue-400" }
    ]
  },
  {
    title: "וידאו",
    icon: "🎬",
    iconBg: "from-orange-500/20 to-red-500/20",
    description: "מודלים ליצירת וידאו",
    features: [
      "יצירת סרטונים באיכות גבוהה מטקסט",
      "עריכה חכמה והסרת אובייקטים",
      "המרת תמונות סטילס לאנימציה"
    ],
    recommendedModels: [
      { id: "runway-gen2", name: "Runway Gen-2", type: "Runway", color: "text-teal-400" },
      { id: "pika", name: "Pika Labs", type: "Pika", color: "text-yellow-400" },
      { id: "stable-video", name: "Stable Video", type: "Stability", color: "text-purple-400" }
    ]
  },
  {
    title: "הקראה",
    icon: "🗣️",
    iconBg: "from-green-500/20 to-emerald-500/20",
    description: "מודלים להקראת טקסט",
    features: [
      "קול טבעי ואינטונציה אנושית",
      "תמיכה במגוון שפות וניבים",
      "שליטה מלאה בטון ומהירות הדיבור"
    ],
    recommendedModels: [
      { id: "whisper", name: "Whisper", type: "OpenAI", color: "text-green-400" },
      { id: "bark", name: "Bark", type: "Suno", color: "text-orange-400" },
      { id: "coqui", name: "Coqui", type: "TTS", color: "text-blue-400" }
    ]
  }
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="container relative mx-auto px-4 py-20">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            גלו את עולם
            <span className="bg-gradient-to-r from-[#7127BA] to-[#5B4BB5] bg-clip-text text-transparent">
              {" "}הבינה המלאכותית
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            המדריך המקיף ביעזור לכם להבין מאיפה להתחיל את המסע בעולם הבינה המלאכותית. כאן תמצאו את כל המידע הדרוש כד�� לבחור את הכלים המתאימים ביותר עבורכם
          </p>
        </div>

        {/* Models Grid */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-12">
            סוגי מודלים
          </h2>
          <CategoryGrid />
        </div>
      </div>
    </section>
  )
} 