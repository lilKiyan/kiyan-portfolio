import type { Metadata } from 'next'
import { Press_Start_2P, Space_Grotesk } from 'next/font/google'
import './globals.css'
import SmoothScroll from './components/SmoothScroll'
import BootProvider from './components/BootProvider'
import PixelNav from './components/PixelNav'

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
})

const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kiyan — Pixel Portfolio',
  description: 'Next.js Developer — Level Up With Every Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${pixelFont.variable} ${bodyFont.variable} bg-[#0a0a0f] text-white antialiased selection:bg-[#2f8] selection:text-emerald-950`}
      >
        <BootProvider>
          <SmoothScroll>
            <PixelNav />
            {children}
          </SmoothScroll>
        </BootProvider>
      </body>
    </html>
  )
}