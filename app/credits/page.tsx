"use client"

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import gsap from 'gsap'
import { FiArrowLeft, FiGithub, FiMail, FiHeart } from 'react-icons/fi'
import { FaReact, FaTelegramPlane } from 'react-icons/fa'
import {
    SiNextdotjs,
    SiTailwindcss,
    SiTypescript,
    SiGreensock,
} from 'react-icons/si'
import { useSound } from '../components/SoundProvider'

// ══════ داده‌های کردیت ══════

const CREDITS_DATA = [
    {
        section: 'THE TEAM',
        items: [
            { role: 'GAME DIRECTOR', name: 'KIYAN NAGHIEE' },
            { role: 'LEAD DEVELOPER', name: 'KIYAN NAGHIEE' },
            { role: 'UI / UX DESIGNER', name: 'AGAIN KIYAN NAGHIEE' },
            { role: 'QA TESTER', name: 'KIYAN NAGHIEE (AT 3 AM)' },
        ],
    },
    {
        section: 'POWERED BY',
        items: [
            { role: 'FRAMEWORK', name: 'NEXT.JS 16' },
            { role: 'LANGUAGE', name: 'TYPESCRIPT' },
            { role: 'STYLING', name: 'TAILWIND CSS' },
            { role: 'ANIMATION', name: 'GSAP + SCROLLTRIGGER' },
            { role: 'SMOOTH SCROLL', name: 'LENIS' },
            { role: 'AUDIO ENGINE', name: 'WEB AUDIO API' },
        ],
    },
    {
        section: 'SPECIAL THANKS',
        items: [
            { role: 'RUBBER DUCK', name: 'DEBUGGING PARTNER' },
            { role: 'AI', name: 'MY DEAR FRIEND' },
            { role: 'COFFEE MACHINE', name: 'RUNNING 24/7' },
            { role: 'THE 3AM ME', name: 'FOR FIXING WHAT 3PM ME BROKE' },
            { role: 'MOM', name: 'FOR ASKING "IS IT DONE YET?"' },
            { role: 'DAD', name: 'NOTHING, HE WAS JUST PASSING BY' },
        ],
    },
    {
        section: 'STATISTICS',
        items: [
            { role: 'BUGS FIXED', name: '127' },
            { role: 'BUGS CREATED', name: '128' },
            { role: 'HOT-CHOCOLATE CONSUMED', name: '∞' },
            { role: 'HOURS CODING', name: 'DIDNT COUNT TBH' },
            { role: 'SANITY REMAINING', name: '12%' },
        ],
    },
]

// ══════ کامپوننت ══════

export default function CreditsPage() {
    const router = useRouter()
    const { play, muted } = useSound()
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isFinished, setIsFinished] = useState(false)

    // ═══ GSAP Auto-Scroll ═══
    useEffect(() => {
        const container = containerRef.current
        const scrollEl = scrollRef.current
        if (!container || !scrollEl) return

        // اگه کاربر reduced motion داره، اسکرول نکن
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        if (prefersReducedMotion) {
            setIsFinished(true)
            return
        }

        // موقعیت اولیه: پایین صفحه
        gsap.set(scrollEl, { y: window.innerHeight })

        const duration = (scrollEl.scrollHeight + window.innerHeight) / 65

        const tween = gsap.to(scrollEl, {
            y: -scrollEl.scrollHeight,
            duration: duration,
            ease: 'none',
            onComplete: () => {
                setIsFinished(true)
                if (!muted) play('win')
            },
        })

        return () => {
            tween.kill()
        }
    }, [muted, play])

    // ═══ هندل Skip ═══
    const handleSkip = () => {
        if (!muted) play('click')
        // kill any active gsap tweens on scrollEl
        if (scrollRef.current) gsap.killTweensOf(scrollRef.current)
        setIsFinished(true)
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-screen bg-[#0a0a0f] overflow-hidden"
        >
            {/* ═══ Scanlines ═══ */}
            <div
                className="absolute inset-0 z-20 pointer-events-none
          [background:repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,0,0,0.2)_3px,rgba(0,0,0,0.2)_4px)]"
            />

            {/* ═══ Glow Ambient ═══ */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[600px] rounded-full pointer-events-none z-0
          blur-[100px] opacity-20"
                style={{
                    background:
                        'radial-gradient(circle, #22ff88 0%, transparent 70%)',
                }}
            />

            {/* ═══ دکمه Skip / Back ═══ */}
            <div className="fixed top-6 left-6 md:top-8 md:left-8 z-50">
                {!isFinished ? (
                    <button
                        onClick={handleSkip}
                        className="font-pixel text-[10px] text-gray-500 hover:text-[#22ff88] transition-colors
              flex items-center gap-2 group"
                    >
                        <span className="w-6 h-6 flex items-center justify-center">
                            »
                        </span>
                        SKIP
                    </button>
                ) : (
                    <Link
                        href="/"
                        className="font-pixel text-[10px] text-gray-500 hover:text-[#22ff88] transition-colors
              flex items-center gap-2 group"
                    >
                        <span className="w-6 h-6 border mb-1 border-[#2a2a35] group-hover:border-[#22ff88] flex items-center justify-center">
                            <FiArrowLeft className="w-3 h-3" />
                        </span>
                        RETURN TO MENU
                    </Link>
                )}
            </div>

            {/* ═══ محتوای کردیت (اسکرول شونده) ═══ */}
            <div className="relative z-10 w-full h-screen flex items-start justify-center overflow-hidden">
                <div
                    ref={scrollRef}
                    className="w-full max-w-2xl px-6 py-32 flex flex-col items-center text-center"
                >
                    {/* ─── تیتر شروع ─── */}
                    <div className="mb-32">
                        <p className="font-pixel text-[10px] text-[#ffd60a] mb-4">
                            ★ A KIYAN NAGHIEE PRODUCTION ★
                        </p>
                        <h1
                            className="font-pixel text-3xl md:text-5xl text-[#22ff88] leading-relaxed
                [text-shadow:0_0_24px_rgba(34,255,136,0.4)]"
                        >
                            CREDITS
                        </h1>
                    </div>

                    {/* ─── بخش‌های کردیت ─── */}
                    {CREDITS_DATA.map((section, idx) => (
                        <div key={idx} className="w-full mb-32">
                            {/* Section Title */}
                            <div className="flex items-center gap-4 mb-12">
                                <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#22ff88]/30" />
                                <h2 className="font-pixel text-xs md:text-sm text-[#22ff88] tracking-wider whitespace-nowrap">
                                    {section.section}
                                </h2>
                                <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#22ff88]/30" />
                            </div>

                            {/* Items */}
                            <div className="space-y-8">
                                {section.items.map((item, j) => (
                                    <div key={j} className="flex flex-col items-center gap-2">
                                        <p className="font-pixel text-[9px] md:text-[10px] text-gray-600 tracking-widest">
                                            {item.role}
                                        </p>
                                        <p className="font-pixel text-sm md:text-lg text-white">
                                            {item.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* ─── بخش پایانی ─── */}
                    <div className="w-full mb-32">
                        <div className="flex items-center gap-4 mb-12">
                            <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#ffd60a]/30" />
                            <h2 className="font-pixel text-xs md:text-sm text-[#ffd60a] tracking-wider whitespace-nowrap">
                                THE END?
                            </h2>
                            <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#ffd60a]/30" />
                        </div>

                        <p className="font-body text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-8">
                            Every line of code, every pixel, every animation on this site was
                            crafted with care. If you made it this far, you're officially a
                            legend and my best FRIEND.
                        </p>

                        <div className="flex items-center justify-center gap-2 mb-8">
                            <span className="font-pixel text-[10px] text-gray-600">
                                MADE WITH
                            </span>
                            <FiHeart className="w-4 h-4 text-[#ff2d55] animate-pulse" />
                        </div>

                        {/* Social links in credits */}
                        <div className="flex items-center justify-center gap-3 mt-12">
                            <a
                                href="https://github.com/lilkiyan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border border-[#2a2a35] text-gray-500
                  hover:border-[#22ff88] hover:text-[#22ff88] transition-colors
                  flex items-center justify-center"
                            >
                                <FiGithub className="w-4 h-4" />
                            </a>
                            <a
                                href="https://t.me/lolkiyan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border border-[#2a2a35] text-gray-500
                  hover:border-[#22ff88] hover:text-[#22ff88] transition-colors
                  flex items-center justify-center"
                            >
                                <FaTelegramPlane className="w-4 h-4" />
                            </a>
                            <a
                                href="mailto:kiyannaghiee85@gmail.com"
                                className="w-10 h-10 border border-[#2a2a35] text-gray-500
                  hover:border-[#22ff88] hover:text-[#22ff88] transition-colors
                  flex items-center justify-center"
                            >
                                <FiMail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* ─── لوگوی پایانی ─── */}
                    <div className="mb-32 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-3 md:gap-4">
                            <FaReact className="w-6 h-6 text-[#61dafb]" />
                            <SiNextdotjs className="w-6 h-6 text-white" />
                            <SiTypescript className="w-6 h-6 text-[#3178c6]" />
                            <SiTailwindcss className="w-6 h-6 text-[#06b6d4]" />
                            <SiGreensock className="w-6 h-6 text-[#88ce02]" />
                        </div>
                        <p className="font-pixel text-[8px] text-gray-700">
                            NEXT.JS · TYPESCRIPT · TAILWIND · GSAP
                        </p>
                        <p className="font-pixel text-[8px] text-gray-800">
                            © {new Date().getFullYear()} KIYAN.NAGHIEE
                        </p>
                    </div>
                </div>
            </div>

            {/* ═══ Overlay "پایان" ═══ */}
            {isFinished && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0a0a0f]/95 backdrop-blur-sm animate-[fadeIn_0.5s_ease-out]">
                    <div className="text-center px-6 max-w-md">
                        <p className="font-pixel text-[10px] text-[#22ff88]/50 mb-4">
                            &gt; END_OF_JOURNY
                        </p>
                        <h2
                            className="font-pixel text-2xl md:text-4xl text-[#22ff88] mb-6
                [text-shadow:0_0_24px_rgba(34,255,136,0.5)]"
                        >
                            THANK YOU
                            <br />
                            FOR PLAYING
                        </h2>
                        <p className="font-body text-gray-400 text-sm mb-8">
                            Now just leave me suffering.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <button
                                onClick={() => {
                                    if (!muted) play('start')
                                    router.push('/')
                                }}
                                className="pixel-btn text-[8px] md:text-[10px]"
                            >
                                PLAY AGAIN
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}