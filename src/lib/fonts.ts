import { IBM_Plex_Sans_Hebrew } from 'next/font/google'

export const hebrew = IBM_Plex_Sans_Hebrew({ 
  subsets: ['hebrew'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hebrew'
}) 