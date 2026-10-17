"use client"

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiChevronDown, FiGithub, FiMail } from 'react-icons/fi'
import { FaTelegramPlane } from 'react-icons/fa'
import { useBoot } from './components/BootProvider'
import ProjectsSection from './components/ProjectsSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import StartMenu from './components/StartMenu'
import { useSmoothScroll } from './components/SmoothScroll'
import { useSound } from './components/SoundProvider'

gsap.registerPlugin(ScrollTrigger)

function TechMarquee() {
  const ITEMS = [
    'NEXT.JS', 'REACT', 'TYPESCRIPT', 'GSAP',
    'TAILWIND', 'BOOTSTRAP', 'PRISMA', 'SQL SERVER', 'FIGMA',
  ]

  const track = [...ITEMS, ...ITEMS]

  return (
    <div className="w-full max-w-3xl marquee-mask border-y border-[#22ff88]/15 py-2 md:py-3">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span
            key={i}
            className="font-pixel text-[9px] md:text-[10px] text-[#22ff88]/60 whitespace-nowrap
              flex items-center gap-3 md:gap-4 pr-3 md:pr-4"
          >
            {item}
            <span className="text-[#22ff88]/30">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const { booted } = useBoot()
  const { play } = useSound()

  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const lineLeftRef = useRef<HTMLSpanElement>(null)
  const lineRightRef = useRef<HTMLSpanElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollTo } = useSmoothScroll()

  // ═══ Hero Timeline ═══
  useEffect(() => {
    if (!booted) return

    const title = titleRef.current
    if (!title) return

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const charStagger = isMobile ? 0.045 : 0.09
    const charY = isMobile ? 30 : 60

    const text = title.textContent || ''
    title.innerHTML = text
      .split('')
      .map((char) => {
        if (char === ' ')
          return `<span class="char" style="opacity:0">&nbsp;</span>`
        return `<span class="char" style="opacity:0">${char}</span>`
      })
      .join('')

    gsap.set(
      [
        subtitleRef.current,
        btnRef.current,
        socialsRef.current,
        statsRef.current,
        scrollHintRef.current,
      ],
      { opacity: 0 }
    )

    const mm = gsap.matchMedia()

    const tl = gsap.timeline({ delay: isMobile ? 0.2 : 0.3 })

    tl.fromTo(
      lineLeftRef.current,
      { scaleX: 0, x: -100 },
      { scaleX: 1, x: 0, duration: 0.7, ease: 'power3.out' }
    )
      .fromTo(
        lineRightRef.current,
        { scaleX: 0, x: 100 },
        { scaleX: 1, x: 0, duration: 0.7, ease: 'power3.out' },
        '<0.1'
      )
      .fromTo(
        title.querySelectorAll('.char'),
        { y: charY, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: charStagger,
          duration: 0.5,
          ease: 'back.out(2.2)',
        },
        '-=0.4'
      )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        btnRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' },
        '-=0.3'
      )
      .fromTo(
        socialsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )

    mm.add('(min-width: 768px)', () => {
      const statsTl = gsap.timeline({ delay: 0.3 })
      statsTl.fromTo(
        statsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '+=0.1'
      )

      const counters = [
        { selector: '[data-count="projects"]', final: 15, suffix: '+' },
        { selector: '[data-count="stack"]', final: 12, suffix: '+' },
      ]

      counters.forEach((c) => {
        const el = statsRef.current?.querySelector(c.selector)
        if (!el) return
        const obj = { value: 0 }
        gsap.to(obj, {
          value: c.final,
          duration: 1.5,
          delay: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.floor(obj.value)}${c.suffix}`
          },
          onComplete: () => {
            el.textContent = `${c.final}${c.suffix}`
          },
        })
      })
    })

    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(
        statsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.5,
        }
      )
    })

    tl.fromTo(
      scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.1'
    )

    const glitchInterval = setInterval(
      () => {
        const chars = title.querySelectorAll('.char')
        if (!chars.length) return
        const randomChar = chars[Math.floor(Math.random() * chars.length)]
        gsap.to(randomChar, {
          x: () => gsap.utils.random(-6, 6),
          duration: 0.08,
          repeat: 3,
          yoyo: true,
          onComplete: () => gsap.set(randomChar, { x: 0 }),
        })
      },
      isMobile ? 4000 : 3000
    )

    return () => {
      tl.kill()
      mm.revert()
      clearInterval(glitchInterval)
    }
  }, [booted])

  // ═══ خروج Hero با اسکرول ═══
  useEffect(() => {
    if (!booted) return

    const isMobile = window.matchMedia('(max-width: 767px)').matches

    const ctx = gsap.context(() => {
      gsap.to('[data-hero-content]', {
        yPercent: isMobile ? -15 : -25,
        opacity: isMobile ? 0.3 : 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom 40%',
          scrub: 0.8,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [booted])

  const handleMenuSelect = (target: string, action: 'scroll' | 'external') => {
    if (action === 'external') {
      window.open(target, '_blank', 'noopener,noreferrer')
      return
    }
    setTimeout(() => {
      scrollTo(target)
    }, 50)
  }

  return (
    <>
      {menuOpen && (
        <StartMenu
          onClose={() => setMenuOpen(false)}
          onSelect={handleMenuSelect}
        />
      )}

      <main ref={heroRef} id="hero" className="relative">
        {/* بلوک‌های پیکسلی شناور پس‌زمینه */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { top: '15%', left: '8%', size: 'w-4 h-4 md:w-6 md:h-6', delay: '0s' },
            { top: '25%', left: '15%', size: 'w-3 h-3', delay: '1s' },
            { top: '60%', left: '12%', size: 'w-3 h-3 md:w-4 md:h-4', delay: '2s' },
            { top: '20%', right: '10%', size: 'w-4 h-4 md:w-5 md:h-5', delay: '0.5s' },
            { top: '70%', right: '18%', size: 'w-3 h-3', delay: '1.5s' },
            { top: '45%', right: '6%', size: 'w-3 h-3 md:w-4 md:h-4', delay: '2.5s' },
          ].map((b, i) => (
            <span
              key={i}
              className={`absolute ${b.size} bg-[#22ff88]/20
                animate-[pixelFloat_6s_ease-in-out_infinite]`}
              style={{
                top: b.top,
                left: b.left,
                right: b.right,
                animationDelay: b.delay,
              }}
            />
          ))}
        </div>

        {/* scanline hero */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none
            [background:repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,0,0,0.15)_3px,rgba(0,0,0,0.15)_4px)]"
        />

        <div
          data-hero-content
          className="relative min-h-[100svh] flex flex-col items-center justify-center
            gap-6 sm:gap-8 md:gap-10 px-4 py-16 md:py-0"
        >
          {/* خط‌های افقی */}
          <div className="flex items-center gap-3 md:gap-4 w-full max-w-4xl px-2">
            <span
              ref={lineLeftRef}
              className="flex-1 h-0.5 bg-gradient-to-l from-[#22ff88] to-transparent origin-right"
            />
            <span className="font-pixel text-[9px] md:text-[10px] text-[#22ff88]/50 shrink-0">
              DEV.LOG
            </span>
            <span
              ref={lineRightRef}
              className="flex-1 h-0.5 bg-gradient-to-r from-[#22ff88] to-transparent origin-left"
            />
          </div>

          {/* تیتر */}
          <h1
            ref={titleRef}
            className="font-pixel
              text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl
              text-[#22ff88] text-center leading-[1.4] md:leading-relaxed
              [text-shadow:0_0_16px_rgba(34,255,136,0.4)] md:[text-shadow:0_0_20px_rgba(34,255,136,0.4)]
              px-2"
          >
            KIYAN NAGHIEE
          </h1>

          <p
            ref={subtitleRef}
            className="font-body text-gray-400
              text-sm sm:text-base md:text-lg
              text-center px-4 max-w-md md:max-w-none"
          >
            Front-End Developer — 2 Years Of Crafting Pixel By Pixel
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center px-4">
            <button
              ref={btnRef}
              onClick={() => {
                play('start')
                setMenuOpen(true)
              }}
              onMouseEnter={() => play('hover')}
              className="pixel-btn"
            >
              PRESS START
            </button>

          </div>

          <div
            ref={statsRef}
            className="flex items-center gap-3 md:gap-6 px-4"
          >
            <div
              onMouseEnter={() => play('hover')}
              className="pixel-card px-3 py-2 md:px-5 md:py-3 text-center
                hover:border-[#22ff88]/60 transition-colors"
            >
              <p
                className="font-pixel text-xs md:text-sm text-[#22ff88]"
                data-count="projects"
              >
                0
              </p>
              <p className="font-body text-[8px] md:text-[10px] text-gray-500 mt-1 md:mt-1.5">
                PROJECTS
              </p>
            </div>

            <div
              onMouseEnter={() => play('hover')}
              className="pixel-card px-3 py-2 md:px-5 md:py-3 text-center
                hover:border-[#22ff88]/60 transition-colors"
            >
              <p
                className="font-pixel text-xs md:text-sm text-[#22ff88]"
                data-count="stack"
              >
                0
              </p>
              <p className="font-body text-[8px] md:text-[10px] text-gray-500 mt-1 md:mt-1.5">
                TECH STACK
              </p>
            </div>

            <div
              onMouseEnter={() => play('hover')}
              className="pixel-card px-3 py-2 md:px-5 md:py-3 text-center
                hover:border-[#22ff88]/60 transition-colors"
            >
              <p className="font-pixel text-xs md:text-sm text-[#22ff88]">∞</p>
              <p className="font-body text-[8px] md:text-[10px] text-gray-500 mt-1 md:mt-1.5">
                COFFEE
              </p>
            </div>
          </div>

          <TechMarquee />

          <div
            ref={scrollHintRef}
            className="absolute bottom-20 md:bottom-10 flex flex-col items-center gap-2"
          >
            <p className="font-pixel text-[8px] text-gray-600">SCROLL</p>
            <FiChevronDown
              className="w-4 h-4 md:w-5 md:h-5 text-[#22ff88]
                animate-[bounceHint_1.2s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </main>

      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}