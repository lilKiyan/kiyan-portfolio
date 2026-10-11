"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiHome, FiCode, FiUser, FiMail } from 'react-icons/fi'

const LINKS = [
  { href: '/#hero',     section: 'hero',     icon: FiHome, label: 'HOME'     },
  { href: '/#projects', section: 'projects', icon: FiCode, label: 'PROJECTS' },
  { href: '/#about',    section: 'about',    icon: FiUser, label: 'ABOUT'    },
  { href: '/#contact',  section: 'contact',  icon: FiMail, label: 'CONTACT'  },
] as const

export default function PixelNav() {
  const [active, setActive] = useState<string>('hero')
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    let rafId: number | null = null

    const updateActive = () => {
      const viewportMiddle = window.innerHeight / 2
      let closest = 'hero'
      let minDistance = Infinity

      for (const link of LINKS) {
        const el = document.getElementById(link.section)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const sectionMiddle = rect.top + rect.height / 2
        const distance = Math.abs(sectionMiddle - viewportMiddle)
        if (distance < minDistance) {
          minDistance = distance
          closest = link.section
        }
      }
      setActive(closest)
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        updateActive()
        rafId = null
      })
    }

    updateActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* ═══ دسکتاپ: داک عمودی راست ═══ */}
      <nav
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-[100]
          flex-col items-center gap-2
          bg-[#12121a]/80 backdrop-blur-md
          border-2 border-[#2a2a35] p-2
          shadow-[6px_6px_0_0_rgba(34,255,136,0.3)]"
      >
        {LINKS.map((link) => {
          const Icon = link.icon
          const isActive = active === link.section

          return (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(link.href)}
              onMouseLeave={() => setHovered(null)}
              aria-label={link.label}
              className={`relative w-11 h-11 flex items-center justify-center
                transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? 'bg-[#22ff88] text-[#0a0a0f]'
                    : 'text-gray-500 hover:text-[#22ff88] hover:bg-[#1a1a24]'
                }`}
            >
              <Icon className="w-4 h-4" />

              {hovered === link.href && (
                <span
                  className="absolute right-full mr-3
                    font-pixel text-[10px] whitespace-nowrap
                    bg-[#22ff88] text-[#0a0a0f]
                    px-2.5 py-1.5
                    shadow-[3px_3px_0_0_rgba(0,0,0,0.5)]"
                >
                  {link.label}
                </span>
              )}

              {isActive && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0a0a0f]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* ═══ موبایل: داک افقی پایین با safe area ═══ */}
      <nav
        className="md:hidden fixed left-1/2 -translate-x-1/2 z-[100]
          flex items-center gap-1
          bg-[#12121a]/95 backdrop-blur-md
          border-2 border-[#2a2a35] p-1.5
          shadow-[4px_4px_0_0_rgba(34,255,136,0.3)]"
        style={{
          bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        {LINKS.map((link) => {
          const Icon = link.icon
          const isActive = active === link.section

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className={`w-12 h-12 flex items-center justify-center
                transition-all duration-200 active:scale-95
                ${
                  isActive
                    ? 'bg-[#22ff88] text-[#0a0a0f]'
                    : 'text-gray-500 active:text-[#22ff88]'
                }`}
            >
              <Icon className="w-[18px] h-[18px]" />
            </Link>
          )
        })}
      </nav>
    </>
  )
}