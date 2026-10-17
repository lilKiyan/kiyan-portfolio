"use client"

import { useEffect, useRef, useState, useCallback } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

type TextScrambleProps = {
    text: string
    className?: string
    scrambleOnHover?: boolean
    scrambleOnMount?: boolean
    delay?: number
}

export default function TextScramble({
    text,
    className = '',
    scrambleOnHover = true,
    scrambleOnMount = false,
    delay = 0,
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text)
    const containerRef = useRef<HTMLSpanElement>(null)
    const frameRef = useRef<number>(0)
    const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([])
    const resolveRef = useRef<(() => void) | null>(null)

    const update = useCallback(() => {
        let output = ''
        let complete = 0

        for (let i = 0; i < queueRef.current.length; i++) {
            const { from, to, start, end } = queueRef.current[i]
            let { char } = queueRef.current[i]

            if (frameRef.current >= end) {
                complete++
                output += to
            } else if (frameRef.current >= start) {
                if (!char || Math.random() < 0.28) {
                    char = CHARS[Math.floor(Math.random() * CHARS.length)]
                    queueRef.current[i].char = char
                }
                output += `<span class="opacity-50 text-[#22ff88]">${char}</span>` // رنگ متفاوت برای کاراکترهای در حال تغییر
            } else {
                output += from
            }
        }

        setDisplayText(output)

        if (complete === queueRef.current.length) {
            if (resolveRef.current) {
                resolveRef.current()
                resolveRef.current = null
            }
        } else {
            frameRef.current++
            requestAnimationFrame(update)
        }
    }, [])

    const setText = useCallback((newText: string) => {
        const oldText = text
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise<void>((resolve) => (resolveRef.current = resolve))

        queueRef.current = []

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            queueRef.current.push({ from, to, start, end })
        }

        cancelAnimationFrame(frameRef.current)
        frameRef.current = 0
        update()

        return promise
    }, [text, update])

    useEffect(() => {
        if (scrambleOnMount) {
            const timer = setTimeout(() => {
                setText(text)
            }, delay * 1000)
            return () => clearTimeout(timer)
        } else {
            setDisplayText(text)
        }
    }, [text, scrambleOnMount, delay, setText])

    const handleMouseEnter = () => {
        if (scrambleOnHover) {
            setText(text)
        }
    }

    return (
        <span
            ref={containerRef}
            className={`inline-block whitespace-pre-wrap ${className}`}
            onMouseEnter={handleMouseEnter}
            dangerouslySetInnerHTML={{ __html: displayText }}
        />
    )
}