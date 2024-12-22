import * as React from 'react'

export function StatsSection(): React.JSX.Element {
  const stats = [
    {
      value: '100+',
      label: 'מודלים',
      description: 'מודלים מובילים בתחום הבינה המלאכותית'
    },
    {
      value: '10+',
      label: 'קטגוריות',
      description: 'תחומים שונים של יישומי בינה מלאכותית'
    },
    {
      value: '1000+',
      label: 'משתמשים',
      description: 'משתמשים פעילים בפלטפורמה שלנו'
    },
    {
      value: '24/7',
      label: 'תמיכה',
      description: 'תמיכה מקצועית וזמינה בכל שעה'
    }
  ]

  return (
    <section className="container relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-muted/50 to-background" />
      <div className="relative grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg border bg-background/50 p-8 backdrop-blur transition-colors hover:bg-accent/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-accent/10 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative flex flex-col items-center gap-2 text-center">
              <div className="text-5xl font-bold tracking-tighter text-accent">
                {stat.value}
              </div>
              <div className="font-semibold">{stat.label}</div>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 