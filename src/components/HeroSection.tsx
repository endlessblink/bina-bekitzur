import Image from 'next/image'
import { Button } from './ui/button'

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
      { name: "ChatGPT", type: "OpenAI", color: "text-green-400" },
      { name: "Claude", type: "Anthropic", color: "text-purple-400" },
      { name: "Gemini", type: "Google", color: "text-blue-400" }
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
      { name: "MusicGen", type: "Meta", color: "text-blue-400" },
      { name: "AudioCraft", type: "Meta", color: "text-blue-400" }
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
      { name: "Runway Gen-2", type: "Runway", color: "text-teal-400" },
      { name: "Pika Labs", type: "Pika", color: "text-yellow-400" },
      { name: "Stable Video", type: "Stability", color: "text-purple-400" }
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
      { name: "Whisper", type: "OpenAI", color: "text-green-400" },
      { name: "Bark", type: "Suno", color: "text-orange-400" },
      { name: "Coqui", type: "TTS", color: "text-blue-400" }
    ]
  }
]

const comparisonData = [
  {
    category: "שיחה",
    models: [
      { name: "ChatGPT", provider: "OpenAI", features: ["יכולת שיחה טבעית", "תמיכה בשפות רבות", "הבנת הקשר"] },
      { name: "Claude", provider: "Anthropic", features: ["יכולת שיחה מתקדמת", "הבנת טקסט מורכב", "תמיכה בקוד"] },
      { name: "Gemini", provider: "Google", features: ["הבנת תמונות", "יכולות מולטימודליות", "אינטגרציה עם שירותי גוגל"] }
    ]
  },
  // Add more categories as needed
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
            המדריך המקיף ביעזור לכם להבין מאיפה להתחיל את המסע בעולם הבינה המלאכותית. כאן תמצאו את כל המידע הדרוש כדי לבחור את הכלים המתאימים ביותר עבורכם
          </p>
        </div>

        {/* Models Grid */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-12">
            סוגי מודלים
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modelTypes.map((model, i) => (
              <div 
                key={i}
                className="group relative bg-[#151515] rounded-xl overflow-hidden hover:bg-[#1A1A1A] transition-all duration-300"
              >
                {/* Card Header with Gradient Background */}
                <div className="relative h-24 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${model.iconBg} opacity-20`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent" />
                  <div className="relative flex items-center h-full px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" role="img" aria-label={model.title}>
                        {model.icon}
                      </span>
                      <h3 className="text-xl font-bold text-white">{model.title}</h3>
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-4">
                  <p className="text-sm text-white/80 mb-4">
                    {model.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-3">
                    {model.features.map((feature, j) => (
                      <div 
                        key={j}
                        className="flex items-start gap-2 text-sm text-white/70"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7127BA] mt-1.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer - Recommended Models */}
                <div className="p-4 bg-[#1A1A1A] mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {model.recommendedModels.map((rec, k) => (
                      <div 
                        key={k}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#2A2A2A] hover:bg-[#3A2A4A] transition-all duration-300 cursor-pointer group/model"
                      >
                        <span className="text-white/90 text-xs font-medium">{rec.name}</span>
                        <span className={`text-[10px] ${rec.color} opacity-80 group-hover/model:opacity-100`}>
                          {rec.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Comparison Table */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-12">
            השוואת מודלים
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1A1A1A]">
                  <th className="p-4 text-right border-b border-[#2A2A2A]">קטגוריה</th>
                  <th className="p-4 text-right border-b border-[#2A2A2A]">מודל</th>
                  <th className="p-4 text-right border-b border-[#2A2A2A]">ספק</th>
                  <th className="p-4 text-right border-b border-[#2A2A2A]">יכולות עיקריות</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((category, i) => (
                  category.models.map((model, j) => (
                    <tr key={`${i}-${j}`} className="hover:bg-[#1A1A1A]">
                      {j === 0 && (
                        <td rowSpan={category.models.length} className="p-4 border-b border-[#2A2A2A] align-top">
                          {category.category}
                        </td>
                      )}
                      <td className="p-4 border-b border-[#2A2A2A]">{model.name}</td>
                      <td className="p-4 border-b border-[#2A2A2A]">{model.provider}</td>
                      <td className="p-4 border-b border-[#2A2A2A]">
                        <ul className="list-disc list-inside">
                          {model.features.map((feature, k) => (
                            <li key={k} className="text-sm text-white/70">{feature}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
} 