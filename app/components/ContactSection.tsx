"use client"

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiMail, FiGithub, FiCopy, FiCheck } from 'react-icons/fi'
import Link from 'next/link'
import { FaTelegramPlane } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const CONTACT_CHANNELS = [
    {
        id: 'email',
        label: 'EMAIL',
        value: 'kiyannaghiee85@gmail.com',
        display: 'kiyannaghiee85',
        suffix: '@gmail.com',
        href: 'mailto:kiyannaghiee85@gmail.com',
        icon: FiMail,
        color: '#22ff88',
        copyable: true,
    },
    {
        id: 'github',
        label: 'GITHUB',
        value: 'lilkiyan',
        display: 'lilkiyan',
        suffix: '',
        href: 'https://github.com/lilkiyan',
        icon: FiGithub,
        color: '#ffffff',
        copyable: false,
    },
    {
        id: 'telegram',
        label: 'TELEGRAM',
        value: '@lolkiyan',
        display: 'lolkiyan',
        suffix: '',
        href: 'https://t.me/lolkiyan',
        icon: FaTelegramPlane,
        color: '#22ff88',
        copyable: false,
    },
]

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const [copied, setCopied] = useState<string | null>(null)
    const [year, setYear] = useState<number | null>(null)

    useEffect(() => {
        setYear(new Date().getFullYear())
    }, [])

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const isMobile = window.matchMedia('(max-width: 767px)').matches

        const ctx = gsap.context(() => {
            gsap.from('.contact-title', {
                y: isMobile ? 25 : 40,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.contact-title', start: 'top 88%', once: true },
            })

            gsap.from('.contact-terminal', {
                y: isMobile ? 25 : 40,
                opacity: 0,
                scale: 0.96,
                duration: 0.6,
                ease: 'back.out(1.5)',
                scrollTrigger: { trigger: '.contact-terminal', start: 'top 88%', once: true },
            })

            gsap.from('.contact-card', {
                y: isMobile ? 30 : 60,
                opacity: 0,
                duration: 0.5,
                stagger: isMobile ? 0.08 : 0.12,
                ease: 'back.out(1.6)',
                scrollTrigger: { trigger: '.contact-grid', start: 'top 88%', once: true },
            })

            gsap.from('.contact-footer', {
                y: 25,
                opacity: 0,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.contact-footer', start: 'top 92%', once: true },
            })

            gsap.fromTo(
                '.contact-glow',
                { opacity: 0, scale: 0.6 },
                {
                    opacity: 1,
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'center center',
                        scrub: 1,
                    },
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const handleCopy = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(id)
            setTimeout(() => setCopied(null), 1500)
        } catch {
            const ta = document.createElement('textarea')
            ta.value = text
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
            setCopied(id)
            setTimeout(() => setCopied(null), 1500)
        }
    }

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative bg-[#0a0a0f] pt-20 md:pt-32 pb-32 md:pb-24 overflow-hidden"
        >
            {/* scanline */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none
          [background:repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,0,0,0.15)_3px,rgba(0,0,0,0.15)_4px)]"
            />

            {/* Glow — ریسپانسیو */}
            <div
                className="contact-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[900px] md:h-[900px]
          rounded-full pointer-events-none z-[1]"
                style={{
                    background:
                        'radial-gradient(circle, rgba(34,255,136,0.12) 0%, transparent 70%)',
                }}
            />

            {/* پیکسل‌های شناور */}
            <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
                {[
                    { top: '12%', left: '6%', size: 'w-4 h-4 md:w-5 md:h-5', delay: '0s' },
                    { top: '25%', right: '8%', size: 'w-3 h-3 md:w-4 md:h-4', delay: '1s' },
                    { top: '55%', left: '10%', size: 'w-3 h-3', delay: '2s' },
                    { top: '70%', right: '14%', size: 'w-4 h-4 md:w-6 md:h-6', delay: '0.5s' },
                ].map((b, i) => (
                    <span
                        key={i}
                        className={`absolute ${b.size} bg-[#22ff88]/15
              animate-[pixelFloat_8s_ease-in-out_infinite]`}
                        style={{
                            top: b.top,
                            left: b.left,
                            right: b.right,
                            animationDelay: b.delay,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-6">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <p className="font-pixel text-[9px] md:text-[10px] text-[#22ff88]/50 mb-3">
                        &gt; FINAL_STAGE
                    </p>
                    <h2
                        className="contact-title font-pixel
              text-2xl sm:text-4xl md:text-6xl
              text-white leading-tight
              [text-shadow:0_0_16px_rgba(34,255,136,0.4)] md:[text-shadow:0_0_20px_rgba(34,255,136,0.4)]"
                    >
                        LET&apos;S_
                        <span className="text-[#22ff88]">CONNECT</span>
                    </h2>
                    <p className="font-body text-gray-500 text-sm md:text-base mt-4 max-w-md mx-auto">
                        Got a project in mind? Let&apos;s turn pixels into something real.
                    </p>
                </div>

                {/* Terminal */}
                <div className="contact-terminal pixel-card max-w-lg mx-auto mb-12 md:mb-16 p-4 md:p-5">
                    <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-[#2a2a35]">
                        <span className="w-2.5 h-2.5 bg-[#ff2d55]" />
                        <span className="w-2.5 h-2.5 bg-[#ffd60a]" />
                        <span className="w-2.5 h-2.5 bg-[#22ff88]" />
                        <span className="ml-auto font-pixel text-[9px] text-gray-600">
                            contact.sh
                        </span>
                    </div>

                    <div className="font-pixel text-[10px] md:text-[11px] space-y-2 md:space-y-2.5">
                        <p className="text-[#22ff88]">
                            <span className="text-gray-600">~$</span> contact --info
                        </p>
                        <p className="text-gray-400 pl-3 md:pl-4">
                            <span className="text-gray-600">&gt;</span> status:{' '}
                            <span className="text-[#22ff88] text-[9px] md:text-[11px]">available for work</span>
                        </p>
                        <p className="text-gray-400 pl-3 md:pl-4">
                            <span className="text-gray-600">&gt;</span> response_time:{' '}
                            <span className="text-[#22ff88] text-[9px] md:text-[11px]">&lt; 24h</span>
                        </p>
                        <p className="text-gray-400 pl-3 md:pl-4">
                            <span className="text-gray-600">&gt;</span> open_for:{' '}
                            <span className="text-[#22ff88] text-[9px] md:text-[11px]">freelance · full-time</span>
                        </p>
                        <p className="text-[#22ff88] pt-2">
                            <span className="text-gray-600">~$</span>{' '}
                            <span className="inline-block w-2 h-3.5 bg-[#22ff88] animate-pulse align-middle" />
                        </p>
                    </div>
                </div>

                {/* Contact Cards */}
                <div className="contact-grid grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-16 md:mb-20">
                    {CONTACT_CHANNELS.map((channel) => {
                        const Icon = channel.icon
                        const isCopied = copied === channel.id

                        return (
                            <div
                                key={channel.id}
                                className="contact-card pixel-card p-4 md:p-5
                  flex flex-col gap-3 md:gap-4 group relative overflow-hidden
                  hover:-translate-y-1 hover:border-[#22ff88]
                  active:scale-[0.98]
                  transition-all duration-300"
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10
                    transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at top, ${channel.color}, transparent 70%)`,
                                    }}
                                />

                                <div className="relative flex items-center justify-between">
                                    <div
                                        className="w-9 h-9 md:w-10 md:h-10 border border-[#2a2a35] flex items-center justify-center
                      group-hover:border-[#22ff88] transition-colors"
                                        style={{ color: channel.color }}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <span className="font-pixel text-[9px] text-gray-600">
                                        {channel.label}
                                    </span>
                                </div>

                                <div className="relative">
                                    <p className="font-pixel text-[11px] md:text-xs text-white break-all">
                                        {channel.display}
                                    </p>
                                    {channel.suffix && (
                                        <p className="font-pixel text-[9px] text-gray-600 mt-1">
                                            {channel.suffix}
                                        </p>
                                    )}
                                </div>

                                <div className="relative flex items-center gap-2 mt-auto pt-3 border-t border-[#2a2a35]">
                                    <a
                                        href={channel.href}
                                        target={channel.href.startsWith('http') ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        className="flex-1 font-pixel text-[9px] text-gray-400
                      hover:text-[#22ff88] transition-colors text-center py-2"
                                    >
                                        OPEN →
                                    </a>

                                    {channel.copyable && (
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(channel.value, channel.id)}
                                            aria-label={`Copy ${channel.label}`}
                                            className="w-8 h-8 flex items-center justify-center
                        border border-[#2a2a35] text-gray-500
                        hover:border-[#22ff88] hover:text-[#22ff88]
                        active:scale-95
                        transition-all duration-200"
                                        >
                                            {isCopied ? (
                                                <FiCheck className="w-3.5 h-3.5 text-[#22ff88]" />
                                            ) : (
                                                <FiCopy className="w-3.5 h-3.5" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Footer */}
                <div className="contact-footer">
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                        <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#22ff88]/30" />
                        <span className="font-pixel text-[9px] md:text-[10px] text-[#22ff88]/60 whitespace-nowrap">
                            ◆ THANKS FOR PLAYING ◆
                        </span>
                        <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#22ff88]/30" />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
                        <p className="font-pixel text-[8px] md:text-[9px] text-gray-600 text-center md:text-left">
                            © {year ?? 2025} KIYAN.NAGHIEE
                            <span className="text-[#22ff88]/40 mx-2">·</span>
                            BUILT WITH NEXT.JS + GSAP
                        </p>

                        <p className="font-pixel text-[8px] md:text-[9px] text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#22ff88] animate-pulse" />
                            <span className="text-[#22ff88]/70">ONLINE</span>
                            <span className="text-[#22ff88]/40">·</span>
                            <span>V.1.0</span>
                        </p>
                    </div>

                    <div className="mt-6 md:mt-8 flex items-center justify-center gap-3">
                        <a
                            href="#hero"
                            className="inline-flex items-center gap-2
      font-pixel text-[9px] text-gray-600
      hover:text-[#22ff88]
      px-4 py-2.5 border border-[#2a2a35] hover:border-[#22ff88]
      active:scale-95
      transition-all duration-200"
                        >
                            <span>↑</span> BACK TO TOP
                        </a>

                        <Link
                            href="/credits"
                            className="font-pixel text-[8px] text-gray-800 hover:text-[#ffd60a]
      transition-colors px-2 py-1"
                            aria-label="View credits"
                        >
                            ★
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}