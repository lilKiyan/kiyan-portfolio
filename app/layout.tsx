import type { Metadata } from 'next'
import { Press_Start_2P, Space_Grotesk } from 'next/font/google'
import './globals.css'
import SmoothScroll from './components/SmoothScroll'
import BootProvider from './components/BootProvider'
import SoundProvider from './components/SoundProvider'
import SoundToggle from './components/SoundToggle'
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
  title: 'Kiyan Naghiee — Front-End Developer',
  description: 'Pixel-perfect by obsession. Front-End Developer crafting experiences with Next.js, React & GSAP.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${pixelFont.variable} ${bodyFont.variable} bg-[#0a0a0f] text-white antialiased`}
      >
        <SoundProvider>
          <BootProvider>
            <SmoothScroll>
              <SoundToggle />
              <PixelNav />
              {children}
            </SmoothScroll>
          </BootProvider>
        </SoundProvider>
      </body>
    </html>
  )
}