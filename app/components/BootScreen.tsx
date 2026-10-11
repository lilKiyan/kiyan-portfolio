"use client"

import { useEffect, useState } from 'react'

type BootScreenProps = {
    onFinish: () => void
}

const BOOT_LINES = [
    'BOOTING KIYAN.DEV...',
    'LOADING ASSETS... OK',
    'ESTABLISHING CONNECTION... OK',
    'READY.',
]

export default function BootScreen({ onFinish }: BootScreenProps) {
    const [progress, setProgress] = useState(0)
    const [flashDone, setFlashDone] = useState(false)

    // فلاش سفید CRT
    useEffect(() => {
        const t = setTimeout(() => setFlashDone(true), 150)
        return () => clearTimeout(t)
    }, [])

    // نوار پیشرفت
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.floor(Math.random() * 12) + 5
                return next >= 100 ? 100 : next
            })
        }, 120)
        return () => clearInterval(timer)
    }, [])

    // پایان
    useEffect(() => {
        if (progress < 100) return
        const t = setTimeout(onFinish, 400)
        return () => clearTimeout(t)
    }, [progress, onFinish])

    // تعداد خطوط قابل نمایش — همگام با progress
    const visibleLines = Math.min(
        BOOT_LINES.length,
        Math.max(1, Math.ceil((progress / 100) * BOOT_LINES.length))
    )

    return (
        <div
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center
        animate-[crtOn_0.15s_ease-out]"
        >
            {!flashDone && <div className="absolute inset-0 bg-white" />}

            <div className="w-72 sm:w-96">
                {/* خطوط boot */}
                <div className="min-h-24 mb-6 font-pixel text-[10px] sm:text-xs text-[#22ff88] space-y-2">
                    {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                        <p key={i} className="animate-[fadeIn_0.1s_ease-out]">
                            <span className="text-[#22ff88]/50">&gt;&nbsp;</span>
                            {line}
                        </p>
                    ))}
                </div>

                {/* progress bar پیکسلی */}
                <div className="flex gap-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <span
                            key={i}
                            className={`h-4 flex-1 transition-colors duration-100 ${i < Math.floor((progress / 100) * 20)
                                    ? 'bg-[#22ff88] shadow-[0_0_8px_rgba(34,255,136,0.6)]'
                                    : 'bg-[#1a1a24]'
                                }`}
                        />
                    ))}
                </div>

                <div className="flex items-center justify-between mt-3">
                    <span className="font-pixel text-[10px] text-[#22ff88]/50">KIYAN.DEV</span>
                    <span className="font-pixel text-xs text-[#22ff88] tabular-nums">
                        {progress}%
                    </span>
                </div>
            </div>
        </div>
    )
}