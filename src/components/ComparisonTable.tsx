const models = [
  {
    category: "שיחה",
    features: [
      "יכולת שיחה טבעית",
      "תמיכה בשפות רבות",
      "הבנת הקשר"
    ],
    provider: "OpenAI",
    model: "ChatGPT"
  },
  {
    category: "שיחה",
    features: [
      "יכולת שיחה מתקדמת",
      "הבנת טקסט מורכב",
      "תמיכה בקוד"
    ],
    provider: "Anthropic",
    model: "Claude"
  },
  {
    category: "שיחה",
    features: [
      "הבנת תמונות",
      "יכולות מולטימודליות",
      "אינטגרציה עם שירותי גוגל"
    ],
    provider: "Google",
    model: "Gemini"
  }
]

export function ComparisonTable() {
  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold text-center mb-12 text-white">השוואת מודלים</h2>
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-xl bg-[#1A1B1E] border border-gray-800">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#1A1B1E]/80">
                <th className="py-5 px-8 text-right font-bold text-white/90">קטגוריה</th>
                <th className="py-5 px-8 text-right font-bold text-white/90">יכולות עיקריות</th>
                <th className="py-5 px-8 text-right font-bold text-white/90">ספק</th>
                <th className="py-5 px-8 text-right font-bold text-white/90">מודל</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {models.map((model, index) => (
                <tr 
                  key={index} 
                  className="transition-colors hover:bg-gray-800/30"
                >
                  <td className="py-5 px-8 text-white/80">{model.category}</td>
                  <td className="py-5 px-8">
                    <ul className="space-y-2.5">
                      {model.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-gray-300">
                          <span className="text-[#7127BA]">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-5 px-8 text-gray-400">{model.provider}</td>
                  <td className="py-5 px-8">
                    <span className="font-medium text-[#7127BA]">
                      {model.model}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 