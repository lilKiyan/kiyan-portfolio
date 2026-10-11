"use client"

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from 'react'

export type Sfx = 'hover' | 'click' | 'confirm' | 'error' | 'start' | 'win'

type SoundContextValue = {
    muted: boolean
    toggleMute: () => void
    play: (sfx: Sfx) => void
}

const SoundContext = createContext<SoundContextValue>({
    muted: true,
    toggleMute: () => { },
    play: () => { },
})

export function useSound() {
    return useContext(SoundContext)
}

const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25]
const BASS_NOTES = [65.41, 73.42, 82.41, 98.0] 

export default function SoundProvider({ children }: { children: ReactNode }) {
    const [muted, setMuted] = useState(true)

    const audioRef = useRef<AudioContext | null>(null)
    const masterGainRef = useRef<GainNode | null>(null)
    const ambientGainRef = useRef<GainNode | null>(null)
    const ambientTimerRef = useRef<number | null>(null)
    const stepRef = useRef(0)

    useEffect(() => {
        const saved = localStorage.getItem('sound-muted')
        if (saved === 'false') setMuted(false)
    }, [])

    const initAudio = useCallback(() => {
        if (audioRef.current) return audioRef.current

        const Ctx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
                .webkitAudioContext
        const ctx = new Ctx()

        const master = ctx.createGain()
        master.gain.value = 1
        master.connect(ctx.destination)

        const ambient = ctx.createGain()
        ambient.gain.value = 0
        ambient.connect(master)

        audioRef.current = ctx
        masterGainRef.current = master
        ambientGainRef.current = ambient

        return ctx
    }, [])

    // ──── تولید یه تُن کوتاه ────
    const tone = useCallback(
        (
            ctx: AudioContext,
            dest: AudioNode,
            freq: number,
            duration: number,
            type: OscillatorType = 'square',
            volume: number = 0.15,
            delay: number = 0,
            slideTo?: number
        ) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.type = type
            osc.frequency.setValueAtTime(freq, ctx.currentTime + delay)
            if (slideTo !== undefined) {
                osc.frequency.exponentialRampToValueAtTime(
                    slideTo,
                    ctx.currentTime + delay + duration
                )
            }

            gain.gain.setValueAtTime(0, ctx.currentTime + delay)
            gain.gain.linearRampToValueAtTime(
                volume,
                ctx.currentTime + delay + 0.008
            )
            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                ctx.currentTime + delay + duration
            )

            osc.connect(gain)
            gain.connect(dest)
            osc.start(ctx.currentTime + delay)
            osc.stop(ctx.currentTime + delay + duration + 0.05)
        },
        []
    )

    // ──── پخش افکت صوتی ────
    const play = useCallback(
        (sfx: Sfx) => {
            if (muted) return
            const ctx = audioRef.current
            const master = masterGainRef.current
            if (!ctx || !master) return

            // اگه context paused بود (مثلاً بعد از tab switch)، ادامه بده
            if (ctx.state === 'suspended') ctx.resume()

            switch (sfx) {
                case 'hover':
                    // بلیپ کوتاه بالا
                    tone(ctx, master, 880, 0.04, 'square', 0.05)
                    break

                case 'click':
                    // کوتاه، پایین‌تر
                    tone(ctx, master, 440, 0.05, 'square', 0.12)
                    tone(ctx, master, 220, 0.07, 'square', 0.08, 0.03)
                    break

                case 'confirm':
                    // دو نُت صعودی (C5 → E5)
                    tone(ctx, master, 523.25, 0.09, 'square', 0.14)
                    tone(ctx, master, 659.25, 0.11, 'square', 0.14, 0.07)
                    break

                case 'error':
                    // نزولی، پایین
                    tone(ctx, master, 220, 0.08, 'sawtooth', 0.12)
                    tone(ctx, master, 165, 0.18, 'sawtooth', 0.12, 0.06)
                    break

                case 'start':
                    // آرپژ صعودی C-E-G-C
                    ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
                        tone(ctx, master, f, 0.1, 'square', 0.13, i * 0.06)
                    )
                    break

                case 'win':
                    // ۴ نُت صعودی بلندتر
                    ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
                        tone(ctx, master, f, 0.18, 'square', 0.15, i * 0.1)
                    )
                    break
            }
        },
        [muted, tone]
    )

    // ──── شروع ambient (ملودی تصادفی پنتاتونیک) ────
    const startAmbient = useCallback(() => {
        const ctx = audioRef.current
        const ambient = ambientGainRef.current
        if (!ctx || !ambient) return

        // fade in
        ambient.gain.cancelScheduledValues(ctx.currentTime)
        ambient.gain.setValueAtTime(ambient.gain.value, ctx.currentTime)
        ambient.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 2)

        const stepMs = 480

        const tick = () => {
            if (!audioRef.current || !ambientGainRef.current) return
            const c = audioRef.current
            const a = ambientGainRef.current
            const step = stepRef.current++

            // نُت ملودی — با احتمال ۷۰٪
            if (Math.random() < 0.7) {
                const note = SCALE[Math.floor(Math.random() * SCALE.length)]
                tone(c, a, note, 0.6, 'triangle', 0.12)
            }

            // باس — هر ۴ قدم
            if (step % 4 === 0) {
                const bass = BASS_NOTES[Math.floor(Math.random() * BASS_NOTES.length)]
                tone(c, a, bass, 1.6, 'sine', 0.2)
            }

            // بلیپ تزئینی — کم و تصادفی
            if (Math.random() < 0.15) {
                const hi = SCALE[Math.floor(Math.random() * SCALE.length)] * 2
                tone(c, a, hi, 0.15, 'square', 0.04)
            }
        }

        tick() // شروع فوری
        ambientTimerRef.current = window.setInterval(tick, stepMs)
    }, [tone])

    const stopAmbient = useCallback(() => {
        const ctx = audioRef.current
        const ambient = ambientGainRef.current
        if (ctx && ambient) {
            ambient.gain.cancelScheduledValues(ctx.currentTime)
            ambient.gain.setValueAtTime(ambient.gain.value, ctx.currentTime)
            ambient.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
        }
        if (ambientTimerRef.current !== null) {
            clearInterval(ambientTimerRef.current)
            ambientTimerRef.current = null
        }
    }, [])

    // ──── sync با muted ────
    useEffect(() => {
        localStorage.setItem('sound-muted', String(muted))

        if (muted) {
            stopAmbient()
        } else {
            // اطمینان از init صدا
            initAudio()
            const ctx = audioRef.current
            if (ctx?.state === 'suspended') ctx.resume()
            startAmbient()
        }
    }, [muted, initAudio, startAmbient, stopAmbient])

    // ──── cleanup ────
    useEffect(() => {
        return () => {
            if (ambientTimerRef.current !== null) {
                clearInterval(ambientTimerRef.current)
            }
            audioRef.current?.close()
        }
    }, [])

    const toggleMute = useCallback(() => {
        setMuted((prev) => {
            const next = !prev
            if (!next) {
                setTimeout(() => {
                    const ctx = audioRef.current
                    const master = masterGainRef.current
                    if (ctx && master) {
                        const now = ctx.currentTime
                        const osc = ctx.createOscillator()
                        const gain = ctx.createGain()
                        osc.type = 'square'
                        osc.frequency.setValueAtTime(523.25, now)
                        osc.frequency.setValueAtTime(659.25, now + 0.07)
                        gain.gain.setValueAtTime(0.15, now)
                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
                        osc.connect(gain)
                        gain.connect(master)
                        osc.start(now)
                        osc.stop(now + 0.2)
                    }
                }, 50)
            }
            return next
        })
    }, [])

    return (
        <SoundContext.Provider value={{ muted, toggleMute, play }}>
            {children}
        </SoundContext.Provider>
    )
}