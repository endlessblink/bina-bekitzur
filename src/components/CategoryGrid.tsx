import { Card } from "@/components/ui/card"

const categories = [
  {
    title: "הקראה",
    description: "מודלים להקראת טקסט",
    items: ["TTS Coqui", "Bark", "Whisper"],
    icon: "🗣️"
  },
  {
    title: "וידאו",
    description: "מודלים ליצירת וידאו",
    items: ["Pika Labs", "Runway Gen-2", "Stable Video"],
    icon: "🎥"
  },
  {
    title: "מוזיקה",
    description: "מודלים ליצירת מוזיקה",
    items: ["AudioCraft", "MusicGen"],
    icon: "🎵"
  },
  {
    title: "שפה",
    description: "מודלים לעיבוד שפה טבעית",
    items: ["Claude", "ChatGPT", "Gemini"],
    icon: "💭"
  }
]

export function CategoryGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Card key={category.title} className="group relative overflow-hidden bg-[#2A1B3D] p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h2 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-2xl font-semibold text-transparent">
                {category.title}
              </h2>
              <span className="text-2xl">{category.icon}</span>
            </div>
            <p className="text-sm text-gray-400">
              {category.description}
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              {category.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>
  )
} 