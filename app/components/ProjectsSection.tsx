"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowUpRight } from 'react-icons/fi'
import { useSound } from './SoundProvider'


gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: '01',
    title: 'PINVERSE',
    desc: 'Full-stack Pinterest-inspired (Persian Pinterest) platform built for Persian users — featuring image discovery, board collections, and social interactions with a localized RTL-first experience.',
    tags: ['NEXT.JS', 'PRISMA', 'FULL-STACK', 'REST API'],
    color: '#ff2d55',
    url: 'https://pinterest-clone-lac-five.vercel.app',
  },
  {
    id: '02',
    title: 'FARTAK SERVER',
    desc: 'A full UI for an Iranian hosting & domain marketplace — clean pricing pages, plan comparison, and a checkout flow, all crafted with Tailwind CSS.',
    tags: ['TAILWIND', 'JS'],
    color: '#3b82f6',
    url: 'https://www.fartakserver.com',
  },
  {
    id: '03',
    title: 'SIBOU APP STORE',
    desc: 'Complete front-end redesign of an Iranian iOS app marketplace — new custom UI, modern visual language, and a smoother discovery experience.',
    tags: ['FRONT-END', 'REDESIGN'],
    color: '#60a5fa',
    url: 'https://app.sibou.ir',
  },
  {
    id: '04',
    title: 'MIRAVE',
    desc: 'A creative & unique portfolio website for mirave-team with beautiful & modern UI/UX.',
    tags: ['TAILWIND', 'UI/UX'],
    color: '#BA2993',
    url: 'https://mirave.ir/',
  },
  {
    id: '05',
    title: 'G-PRO (IRANIAN GOOGLE)',
    desc: 'An Iranian search engine UI — fast, minimal, and Google-inspired, built from scratch with vanilla HTML, CSS, and JavaScript.',
    tags: ['HTML', 'CSS', 'JAVASCRIPT', 'BOOTSTRAP'],
    color: '#a855f7',
    url: 'https://google-pro.ir',
  },
  {
    id: '06',
    title: 'SUPER DASHBOARD',
    desc: 'All-in-one admin panel — real-time monitoring, task management, and role-based access control.',
    tags: ['NEXT.JS', 'ADMIN', 'MONITORING'],
    color: '#22ff88',
    url: '#',
  },
  {
    id: '07',
    title: 'PASAAZH',
    desc: 'A store builder with 30+ industry-ready templates — launch a full online shop in minutes, no code required.',
    tags: ['BOOTSTRAP', 'E-COMMERCE', 'BUILDER'],
    color: '#ffd60a',
    url: 'https://pasaazh.com/',
  },
  {
    id: '08',
    title: 'AINCI',
    desc: 'An AI & tech news platform — clean editorial layout, category filtering, and a modern reading experience built for a Persian audience.',
    tags: ['BOOTSTRAP', 'UI/UX', 'RESPONSIVE'],
    color: '#FA8CE5',
    url: 'https://ainci.ir/',
  },
  {
    id: '09',
    title: 'IRANIAN GMAIL',
    desc: 'An Iranian Email platform with fully exclusive design.',
    tags: ['BOOTSTRAP', 'UI/UX', 'RESPONSIVE'],
    color: '#D4C2FF',
    url: 'https://github.com/lilKiyan/Iranian-Gmail',
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const track = trackRef.current
    if (!section || !pin || !track) return

    const cards = gsap.utils.toArray<HTMLElement>('.project-card', track)

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const getScrollAmount = () => {
          const trackWidth = track.scrollWidth
          const viewportWidth = document.documentElement.clientWidth
          return trackWidth - viewportWidth
        }

        const horizontalTween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 2,
            refreshPriority: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`
              }
              if (counterRef.current) {
                const idx = Math.min(
                  PROJECTS.length,
                  Math.max(1, Math.floor(self.progress * PROJECTS.length) + 1)
                )
                counterRef.current.textContent = String(idx).padStart(2, '0')
              }
            },
          },
        })

        cards.forEach((card) => {
          const content = card.querySelector('.card-content')
          if (content) {
            gsap.from(content, {
              y: 60,
              opacity: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: 'left 90%',
                end: 'left 50%',
                toggleActions: 'play none none reverse',
              },
            })
          }

          const num = card.querySelector('.card-number')
          if (num) {
            gsap.fromTo(
              num,
              { x: 60 },
              {
                x: -60,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: 'left right',
                  end: 'right left',
                  scrub: 1,
                },
              }
            )
          }
        })
      })

      mm.add('(max-width: 767px)', () => {
        cards.forEach((card) => {
          gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          })
        })
      })

      const title = section.querySelector('.projects-title')
      if (title) {
        gsap.from(title, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
            once: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#0a0a0f]"
    >
      <div
        className="absolute inset-0 z-[1] pointer-events-none
          [background:repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,0,0,0.15)_3px,rgba(0,0,0,0.15)_4px)]"
      />

      <div className="relative z-10 pt-20 md:pt-32 pb-6 md:pb-10 px-5 md:px-6 max-w-7xl mx-auto">
        <p className="font-pixel text-[9px] md:text-[10px] text-[#22ff88]/50 mb-3">
          &gt; SELECTED WORKS
        </p>
        <h2
          className="projects-title font-pixel
            text-3xl sm:text-4xl md:text-6xl
            text-white leading-tight
            [text-shadow:0_0_16px_rgba(34,255,136,0.4)] md:[text-shadow:0_0_20px_rgba(34,255,136,0.4)]"
        >
          PROJECT<span className="text-[#22ff88]">S</span>
        </h2>
      </div>

      <div ref={pinRef} className="relative md:h-screen md:overflow-hidden">
        <div
          className="hidden md:flex absolute top-8 right-12 z-20
            font-pixel text-[10px] text-gray-600 items-center gap-2"
        >
          <span
            ref={counterRef}
            className="text-[#22ff88] text-2xl tabular-nums"
          >
            01
          </span>
          <span>/</span>
          <span>{String(PROJECTS.length).padStart(2, '0')}</span>
        </div>

        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-5 md:gap-8
            pl-5 pr-5 md:pl-24 md:pr-40
            md:h-full md:items-center
            pb-24 md:pb-0
            will-change-transform"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="hidden md:block absolute bottom-8 left-0 right-0 px-24 z-20">
          <div className="h-0.5 bg-[#2a2a35] overflow-hidden">
            <span
              ref={progressRef}
              className="block h-full bg-[#22ff88] origin-left"
              style={{
                transform: 'scaleX(0)',
                boxShadow: '0 0 10px #22ff88',
              }}
            />
          </div>
          <div className="flex justify-between mt-2 font-pixel text-[8px] text-gray-700">
            <span>SCROLL TO EXPLORE</span>
            <span>◆ GSAP POWERED</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════ Project Card ══════
function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const { play } = useSound()

  return (
    <article
      onMouseEnter={() => play('hover')}
      className="project-card w-full md:flex-shrink-0 md:w-[380px] md:h-[500px]
        pixel-card p-5 md:p-7 relative overflow-hidden group
        flex flex-col justify-between"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-15
          transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${project.color}, transparent 70%)`,
        }}
      />

      <span
        className="card-number absolute top-2 right-3 md:right-4 font-pixel
          text-[90px] sm:text-[100px] md:text-[140px] leading-none
          select-none pointer-events-none opacity-[0.06]"
        style={{ color: project.color }}
      >
        {project.id}
      </span>

      <div className="card-content relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <span className="font-pixel text-[9px] text-gray-600">
            ◆ PROJECT_{project.id}
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            onMouseEnter={(e) => {
              e.stopPropagation()
              play('hover')
            }}
            onClick={() => play('click')}
            className="w-8 h-8 flex items-center justify-center
              border border-[#2a2a35] text-gray-500
              hover:border-[#22ff88] hover:text-[#22ff88]
              hover:-translate-y-0.5 hover:translate-x-0.5
              active:scale-95
              transition-all duration-200"
          >
            <FiArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex-1 flex flex-col justify-center py-2 md:py-0">
          <h3
            className="font-pixel text-base sm:text-lg md:text-xl
              leading-relaxed mb-2 md:mb-3"
            style={{ color: project.color }}
          >
            {project.title}
          </h3>
          <p className="font-body text-[13px] md:text-sm text-gray-400 leading-relaxed">
            {project.desc}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 md:gap-2 pt-3 md:pt-5 border-t border-[#2a2a35]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-pixel text-[8px] text-gray-500
                px-1.5 md:px-2 py-1 border border-[#2a2a35]
                group-hover:border-[#22ff88]/40 group-hover:text-[#22ff88]/70
                transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}