"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import {
    FiCode,
    FiUser,
    FiMail,
    FiExternalLink,
    FiChevronRight,
    FiStar
} from 'react-icons/fi'

// ══════ داده‌ها ══════

type MenuItem = {
    id: string
    label: string
    hint: string
    icon: React.ComponentType<{ className?: string }>
    action: 'scroll' | 'external'
    target: string
}

const MENU_ITEMS: MenuItem[] = [
    {
        id: 'new-game',
        label: 'NEW GAME',
        hint: 'PROJECTS',
        icon: FiCode,
        action: 'scroll',
        target: '#projects',
    },
    {
        id: 'continue',
        label: 'CONTINUE',
        hint: 'ABOUT',
        icon: FiUser,
        action: 'scroll',
        target: '#about',
    },
    {
        id: 'options',
        label: 'OPTIONS',
        hint: 'CONTACT',
        icon: FiMail,
        action: 'scroll',
        target: '#contact',
    },
    {
        id: 'quit',
        label: 'QUIT',
        hint: 'GITHUB',
        icon: FiExternalLink,
        action: 'external',
        target: 'https://github.com/lilkiyan',
    },
    {
        id: 'credits',
        label: 'CREDITS',
        hint: '???',
        icon: FiStar,  
        action: 'external',
        target: '/credits',  
    },
]

// ══════ کامپوننت ══════

type StartMenuProps = {
    onClose: () => void
    onSelect: (target: string, action: 'scroll' | 'external') => void
}

export default function StartMenu({ onClose, onSelect }: StartMenuProps) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    const [selected, setSelected] = useState(0)

    // ═══ ورود با GSAP ═══
    useEffect(() => {
        const overlay = overlayRef.current
        const panel = panelRef.current
        if (!overlay || !panel) return

        const tl = gsap.timeline()

        tl.fromTo(
            overlay,
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: 'power2.out' }
        )
            .fromTo(
                panel,
                { scale: 0.85, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.6)' },
                '-=0.1'
            )
            .fromTo(
                '.menu-item',
                { x: -20, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.06,
                    ease: 'power2.out',
                },
                '-=0.2'
            )

        return () => {
            tl.kill()
        }
    }, [])

    // ═══ انتخاب آیتم ═══
    const handleSelect = useCallback(
        (index: number) => {
            const item = MENU_ITEMS[index]
            if (!item) return

            // افکت خروجی
            const panel = panelRef.current
            if (panel) {
                gsap.to(panel, {
                    scale: 0.95,
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power2.in',
                })
            }

            setTimeout(() => {
                onSelect(item.target, item.action)
                onClose()
            }, 180)
        },
        [onSelect, onClose]
    )

    // ═══ کیبورد ═══
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            const key = e.key

            if (key === 'ArrowUp' || key.toLowerCase() === 'w') {
                e.preventDefault()
                setSelected((s) => (s - 1 + MENU_ITEMS.length) % MENU_ITEMS.length)
            } else if (key === 'ArrowDown' || key.toLowerCase() === 's') {
                e.preventDefault()
                setSelected((s) => (s + 1) % MENU_ITEMS.length)
            } else if (key === 'Enter' || key === ' ') {
                e.preventDefault()
                handleSelect(selected)
            } else if (key === 'Escape') {
                e.preventDefault()
                onClose()
            }
        }

        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [selected, handleSelect, onClose])

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center
        bg-black/85 backdrop-blur-sm p-4"
            onClick={(e) => {
                // کلیک روی بک‌گراند = بستن
                if (e.target === e.currentTarget) onClose()
            }}
        >
            {/* ⭐ scanline روی کل overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-[1]
          [background:repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,0,0,0.25)_3px,rgba(0,0,0,0.25)_4px)]"
            />

            {/* ⭐ Glow پس‌زمینه */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background:
                        'radial-gradient(circle, rgba(34,255,136,0.15) 0%, transparent 70%)',
                }}
            />

            <div
                ref={panelRef}
                className="relative pixel-card z-[2]
          w-full max-w-md
          p-6 md:p-8
          shadow-[0_0_60px_rgba(34,255,136,0.3)]"
                style={{ borderColor: '#22ff88' }}
            >
                {/* ═══ گوشه‌های پیکسلی ═══ */}
                <span className="absolute -top-1 -left-1 w-3 h-3 bg-[#22ff88]" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#22ff88]" />
                <span className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#22ff88]" />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#22ff88]" />

                {/* ═══ Header ═══ */}
                <div className="text-center mb-6 md:mb-8">
                    <p className="font-pixel text-[9px] text-gray-600 mb-2">
                        ◆ MAIN_MENU
                    </p>
                    <h2
                        className="font-pixel text-lg md:text-xl text-[#22ff88]
              [text-shadow:0_0_16px_rgba(34,255,136,0.5)]"
                    >
                        KIYAN.DEV
                    </h2>
                    <div className="flex items-center gap-2 justify-center mt-3">
                        <span className="h-px w-8 bg-[#22ff88]/40" />
                        <span className="font-pixel text-[8px] text-gray-700">
                            SELECT_OPTION
                        </span>
                        <span className="h-px w-8 bg-[#22ff88]/40" />
                    </div>
                </div>

                {/* ═══ Menu Items ═══ */}
                <div className="space-y-1 mb-6 md:mb-8">
                    {MENU_ITEMS.map((item, i) => {
                        const Icon = item.icon
                        const isSelected = i === selected

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleSelect(i)}
                                onMouseEnter={() => setSelected(i)}
                                className={`menu-item
                  w-full flex items-center gap-3 md:gap-4
                  px-3 md:px-4 py-3 md:py-3.5
                  text-left
                  border-2
                  transition-all duration-150
                  group
                  ${isSelected
                                        ? 'border-[#22ff88] bg-[#22ff88]/10'
                                        : 'border-transparent hover:border-[#2a2a35]'
                                    }
                `}
                            >
                                {/* Cursor ▶ */}
                                <span
                                    className={`font-pixel text-[10px] transition-all duration-150 shrink-0
                    ${isSelected
                                            ? 'text-[#22ff88] translate-x-0'
                                            : 'text-transparent -translate-x-2'
                                        }
                  `}
                                >
                                    ▶
                                </span>

                                {/* Icon */}
                                <Icon
                                    className={`w-4 h-4 shrink-0 transition-colors
                    ${isSelected
                                            ? 'text-[#22ff88]'
                                            : 'text-gray-600 group-hover:text-gray-500'
                                        }
                  `}
                                />

                                {/* Label */}
                                <span
                                    className={`font-pixel text-[11px] md:text-xs flex-1 transition-colors
                    ${isSelected
                                            ? 'text-white'
                                            : 'text-gray-500 group-hover:text-gray-400'
                                        }
                  `}
                                >
                                    {item.label}
                                </span>

                                {/* Hint (سمت راست) */}
                                <span
                                    className={`font-pixel text-[8px] md:text-[9px] shrink-0 transition-colors
                    ${isSelected
                                            ? 'text-[#22ff88]/70'
                                            : 'text-gray-700'
                                        }
                  `}
                                >
                                    {item.hint}
                                </span>

                                {/* Arrow end */}
                                {item.action === 'external' && (
                                    <FiChevronRight
                                        className={`w-3 h-3 shrink-0 transition-colors
                      ${isSelected ? 'text-[#22ff88]/60' : 'text-gray-800'}
                    `}
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* ═══ خط جداکننده ═══ */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="flex-1 h-px bg-[#2a2a35]" />
                    <span className="font-pixel text-[7px] text-gray-700">CONTROLS</span>
                    <span className="flex-1 h-px bg-[#2a2a35]" />
                </div>

                {/* ═══ Footer hints ═══ */}
                <div className="flex items-center justify-between font-pixel text-[8px] text-gray-600">
                    <div className="flex items-center gap-3">
                        <span>
                            <kbd className="px-1.5 py-0.5 border border-[#2a2a35] rounded-sm text-[7px]">
                                ↑↓
                            </kbd>{' '}
                            NAV
                        </span>
                        <span>
                            <kbd className="px-1.5 py-0.5 border border-[#2a2a35] rounded-sm text-[7px]">
                                ↵
                            </kbd>{' '}
                            SELECT
                        </span>
                    </div>
                    <span>
                        <kbd className="px-1.5 py-0.5 border border-[#2a2a35] rounded-sm text-[7px]">
                            ESC
                        </kbd>{' '}
                        EXIT
                    </span>
                </div>
            </div>
        </div>
    )
}