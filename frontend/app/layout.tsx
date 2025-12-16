import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display, Montserrat } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-serif',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'TaskFlow - Productivity App',
  description: 'A secure and modern task management application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} ${montserrat.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}