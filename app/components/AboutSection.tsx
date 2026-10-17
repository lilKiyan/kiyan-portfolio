"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextScramble from './TextScramble'
import {
    FiMapPin,
    FiCode,
    FiBriefcase,
    FiBookOpen,
    FiTerminal,
    FiCpu,
    FiZap,
    FiDatabase,
} from 'react-icons/fi'
import { FaReact } from 'react-icons/fa'
import {
    SiNextdotjs,
    SiTypescript,
    SiJavascript,
    SiTailwindcss,
    SiBootstrap,
    SiGit,
    SiDotnet,
    SiMysql,
} from 'react-icons/si'
import { useSound } from './SoundProvider'

gsap.registerPlugin(ScrollTrigger)

const TECH_SKILLS = [
    { name: 'REACT', icon: FaReact, color: '#61dafb' },
    { name: 'NEXT.JS', icon: SiNextdotjs, color: '#ffffff' },
    { name: 'TYPESCRIPT', icon: SiTypescript, color: '#3178c6' },
    { name: 'JAVASCRIPT', icon: SiJavascript, color: '#f7df1e' },
    { name: 'TAILWIND', icon: SiTailwindcss, color: '#06b6d4' },
    { name: 'BOOTSTRAP', icon: SiBootstrap, color: '#7952b3' },
    { name: 'ZUSTAND', icon: FiZap, color: '#22ff88' },
    { name: 'REST API', icon: FiCpu, color: '#22ff88' },
    { name: 'GIT/GITHUB', icon: SiGit, color: '#f05032' },
    { name: 'ASP.NET', icon: SiDotnet, color: '#512bd4' },
    { name: 'SQL SERVER', icon: FiDatabase, color: '#cc2927' },
    { name: 'MYSQL', icon: SiMysql, color: '#4479a1' },
]

const SOFT_SKILLS = [
    'TEAMWORK',
    'SELF-LEARNING',
    'PROBLEM-SOLVING',
    'CRITICAL THINKING',
    'AGILE',
    'TIME MANAGEMENT',
]

const EXPERIENCE = [
    {
        period: '2025 — PRESENT',
        role: 'FRONT-END DEVELOPER',
        company: 'ANDISHMANDAN ASRE FARA NEGAH',
        location: 'TEHRAN',
        current: true,
        points: [
            'Championed React, Next.js & Tailwind CSS adoption across key enterprise projects.',
            'Led Bootstrap → Tailwind migration — boosted page performance by ~40%.',
            'Revamped Pasaazh store builder with unified component system (30+ templates).',
        ],
    },
    {
        period: '2024 — 2025',
        role: 'FRONT-END DEVELOPER',
        company: 'MIRAVE TEAM · FREELANCE',
        location: 'REMOTE',
        current: false,
        points: [
            'Built diverse websites using Bootstrap, Tailwind CSS, and vanilla JavaScript.',
            'Focused on clean, responsive design and modern visual communication.',
        ],
    },
]

const EDUCATION = {
    degree: 'B.Sc. COMPUTER ENGINEERING',
    university: 'ISLAMIC AZAD UNIVERSITY',
    branch: 'TEHRAN NORTH BRANCH',
    period: '2023 — 2027 (EXPECTED)',
}



export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const { play } = useSound()

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const isMobile = window.matchMedia('(max-width: 767px)').matches
        const slideX = isMobile ? -20 : -40
        const fadeY = isMobile ? 20 : 40

        const ctx = gsap.context(() => {
            gsap.from('.about-title', {
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.about-title', start: 'top 88%', once: true },
            })

            gsap.from('.about-avatar', {
                scale: 0.75,
                opacity: 0,
                rotate: -8,
                duration: 0.8,
                ease: 'back.out(1.6)',
                scrollTrigger: { trigger: '.about-avatar', start: 'top 82%', once: true },
            })

            gsap.from('.bio-line', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.about-bio', start: 'top 82%', once: true },
            })

            gsap.from('.skill-card', {
                y: fadeY,
                opacity: 0,
                scale: 0.92,
                duration: 0.5,
                stagger: isMobile ? 0.03 : 0.04,
                ease: 'back.out(1.6)',
                scrollTrigger: { trigger: '.skills-grid', start: 'top 88%', once: true },
            })

            gsap.from('.soft-chip', {
                y: 15,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.soft-skills', start: 'top 92%', once: true },
            })

            gsap.from('.timeline-line', {
                scaleY: 0,
                transformOrigin: 'top center',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.experience-timeline',
                    start: 'top 78%',
                    end: 'bottom 60%',
                    scrub: 1,
                },
            })

            gsap.utils.toArray<HTMLElement>('.exp-item').forEach((item) => {
                gsap.from(item, {
                    x: slideX,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: item, start: 'top 88%', once: true },
                })
            })

            gsap.from('.edu-card', {
                y: fadeY,
                opacity: 0,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.edu-card', start: 'top 88%', once: true },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative bg-[#0a0a0f] py-20 md:py-32"
        >
            <div
                className="absolute inset-0 z-[1] pointer-events-none
          [background:repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,0,0,0.15)_3px,rgba(0,0,0,0.15)_4px)]"
            />

            <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-6">
                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <p className="font-pixel text-[9px] md:text-[10px] text-[#ffd60a]/50 mb-3">
                        &gt; PLAYER_PROFILE
                    </p>
                    <h2
                        className="about-title font-pixel
              text-3xl sm:text-4xl md:text-6xl
              text-white leading-tight
              [text-shadow:0_0_16px_rgba(255,214,10,0.3)] md:[text-shadow:0_0_20px_rgba(255,214,10,0.3)]"
                    >
                        <TextScramble
                            text="ABOUT"
                            scrambleOnMount={true}
                            delay={0.2}
                            scrambleOnHover={true}
                        />
                        <span className="text-[#ffd60a]">
                            <TextScramble
                                text="_ME"
                                scrambleOnMount={true}
                                delay={0.2}
                                scrambleOnHover={true}
                            />
                        </span>
                    </h2>
                </div>

                {/* Bio + Avatar */}
                <div className="grid md:grid-cols-[260px_1fr] gap-10 md:gap-16 items-start mb-16 md:mb-24">
                    {/* آواتار */}
                    <div className="about-avatar relative mx-auto md:mx-0 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64">
                        <span className="absolute -top-1 -left-1 w-3 h-3 bg-[#ffd60a] z-10" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#ffd60a] z-10" />
                        <span className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#ffd60a] z-10" />
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#ffd60a] z-10" />

                        <div
                            className="relative w-full h-full rounded-full overflow-hidden
                border-4 border-[#ffd60a]
                shadow-[0_0_40px_rgba(255,214,10,0.35)] md:shadow-[0_0_50px_rgba(255,214,10,0.35)]"
                        >
                            <Image
                                src="/avatar.png"
                                alt="Kiyan Naghiee"
                                fill
                                sizes="(max-width: 768px) 176px, 256px"
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div
                            className="absolute -bottom-3 left-1/2 -translate-x-1/2
                font-pixel text-[8px] md:text-[9px] text-[#0a0a0f] bg-[#ffd60a]
                px-2.5 md:px-3 py-1 md:py-1.5
                shadow-[3px_3px_0_0_rgba(0,0,0,0.5)] whitespace-nowrap z-10"
                        >
                            LVL.02 · FRONT-END
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="about-bio space-y-5 md:space-y-6 md:pt-4 text-center md:text-left">
                        <p className="bio-line font-pixel text-sm sm:text-lg md:text-2xl text-[#ffd60a] leading-relaxed">
                            Front-End Developer.
                            <br />
                            Pixel-perfect by obsession.
                        </p>

                        <p className="bio-line font-body text-sm md:text-base text-gray-400 leading-relaxed text-justify">
                            Two years of turning complex designs into scalable, performant web
                            apps. I led Bootstrap → Tailwind migrations, overhauled legacy
                            codebases into modern React + Next.js architectures, and scaled a
                            store-builder platform to 30+ templates. I care about clean code,
                            sharp UI, and shipping things that actually work.
                        </p>

                        <div className="bio-line flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 pt-2 justify-center md:justify-start">
                            <div className="flex items-center gap-2">
                                <FiMapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#ffd60a]" />
                                <span className="font-pixel text-[9px] md:text-[10px] text-gray-400">
                                    TEHRAN, IR
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiBriefcase className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#ffd60a]" />
                                <span className="font-pixel text-[9px] md:text-[10px] text-gray-400">
                                    ANDISHMANDAN
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiTerminal className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#ffd60a]" />
                                <span className="font-pixel text-[9px] md:text-[10px] text-gray-400">
                                    2+ YEARS
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SKILLS */}
                <div className="mb-16 md:mb-24">
                    <div className="flex items-center gap-3 mb-5 md:mb-6">
                        <FiCode className="w-4 h-4 text-[#ffd60a]" />
                        <h3 className="font-pixel text-xs md:text-sm text-white">
                            SKILLS.TREE
                        </h3>
                        <div className="flex-1 h-px bg-[#2a2a35]" />
                    </div>

                    <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                        {TECH_SKILLS.map((skill) => {
                            const Icon = skill.icon
                            return (
                                <div
                                    key={skill.name}
                                    onMouseEnter={() => play('hover')}
                                    className="skill-card pixel-card px-3 py-2.5 md:px-4 md:py-3
                    flex items-center gap-2 md:gap-3 group cursor-default
                    hover:-translate-y-1 hover:border-[#ffd60a]/60
                    transition-all duration-200"
                                >
                                    <Icon
                                        className="w-4 h-4 md:w-5 md:h-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                                        style={{ color: skill.color }}
                                    />
                                    <span className="font-pixel text-[9px] md:text-[10px] text-gray-400 group-hover:text-white transition-colors truncate">
                                        {skill.name}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-6 md:mt-8">
                        <h4 className="font-pixel text-[9px] md:text-[10px] text-gray-500 mb-3 md:mt-25 mt-15">
                            ◆ SOFT.SKILLS
                        </h4>
                        <div className="soft-skills flex flex-wrap gap-2">
                            {SOFT_SKILLS.map((skill) => (
                                <span
                                    key={skill}
                                    className="soft-chip font-pixel text-[8px] md:text-[9px] text-gray-500
                    px-2.5 md:px-3 py-1.5 border border-[#2a2a35]
                    hover:border-[#ffd60a]/50 hover:text-[#ffd60a]/70
                    hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* EXPERIENCE */}
                <div className="mb-16 md:mb-24">
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <FiBriefcase className="w-4 h-4 text-[#ffd60a]" />
                        <h3 className="font-pixel text-xs md:text-sm text-white">
                            EXPERIENCE.LOG
                        </h3>
                        <div className="flex-1 h-px bg-[#2a2a35]" />
                    </div>

                    <div className="experience-timeline relative pl-6 md:pl-12">
                        <span
                            className="timeline-line absolute left-1 md:left-2.5 top-2 bottom-0 w-0.5
                bg-gradient-to-b from-[#ffd60a] via-[#ffd60a]/40 to-transparent"
                        />

                        <div className="space-y-8 md:space-y-12">
                            {EXPERIENCE.map((exp, i) => (
                                <div key={i} className="exp-item relative">
                                    <span
                                        className="absolute -left-6 md:-left-12 top-6 w-3.5 h-3.5 md:w-5 md:h-5
                      border-2 border-[#ffd60a] bg-[#0a0a0f]
                      shadow-[0_0_12px_rgba(255,214,10,0.6)]"
                                    />

                                    <article className="pixel-card p-4 md:p-6">
                                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                                            <span
                                                className="font-pixel text-[8px] md:text-[9px] text-[#ffd60a]
                          px-2 py-1 mb-2 border border-[#ffd60a]/30"
                                            >
                                                {exp.period}
                                            </span>
                                            {exp.current && (
                                                <span className="font-pixel text-[8px] text-[#22ff88] flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 bg-[#22ff88] animate-pulse" />
                                                    ACTIVE
                                                </span>
                                            )}
                                        </div>

                                        <h4 className="font-pixel text-xs md:text-lg text-white mb-6">
                                            {exp.role}
                                        </h4>
                                        <p className="font-pixel text-[9px] md:text-[10px] text-gray-500 mb-3 md:mb-4">
                                            {exp.company} · {exp.location}
                                        </p>

                                        <ul className="space-y-2">
                                            {exp.points.map((point, j) => (
                                                <li
                                                    key={j}
                                                    className="font-body text-[13px] md:text-sm text-gray-400 leading-relaxed flex gap-2"
                                                >
                                                    <span className="text-[#ffd60a] shrink-0 mt-0.5">▸</span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* EDUCATION */}
                <div>
                    <div className="flex items-center gap-3 mb-5 md:mb-6">
                        <FiBookOpen className="w-4 h-4 text-[#ffd60a]" />
                        <h3 className="font-pixel text-xs md:text-sm text-white">
                            EDUCATION.EXE
                        </h3>
                        <div className="flex-1 h-px bg-[#2a2a35]" />
                    </div>

                    <article className="edu-card pixel-card p-5 md:p-8 flex items-start gap-4 md:gap-5">
                        <div
                            className="w-10 h-10 md:w-14 md:h-14 border-2 border-[#ffd60a]
                flex items-center justify-center shrink-0
                shadow-[0_0_20px_rgba(255,214,10,0.2)]"
                        >
                            <FiBookOpen className="w-4 h-4 md:w-6 md:h-6 text-[#ffd60a]" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="font-pixel text-xs mb-3 md:text-lg text-white mb-1.5 break-words">
                                {EDUCATION.degree}
                            </h4>
                            <p className="font-pixel text-[9px] md:text-[10px] text-gray-500 mb-3 break-words">
                                {EDUCATION.university} · {EDUCATION.branch}
                            </p>
                            <span
                                className="inline-block font-pixel text-[8px] md:text-[9px] text-[#ffd60a]
                  px-2 py-1 border border-[#ffd60a]/30"
                            >
                                {EDUCATION.period}
                            </span>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}