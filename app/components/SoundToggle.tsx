"use client"

import { FiVolume2, FiVolumeX } from 'react-icons/fi'
import { useSound } from './SoundProvider'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SoundToggle() {
  const { muted, toggleMute, play } = useSound()
  const btnRef = useRef<HTMLButtonElement>(null)

  // ──── پالس ظریف وقتی unmute ست ────
  useEffect(() => {
    if (!muted && btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 1 },
        {
          scale: 1.12,
          duration: 0.18,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        }
      )
    }
  }, [muted])

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toggleMute}
      onMouseEnter={() => play('hover')}
      aria-label={muted ? 'Enable sound' : 'Disable sound'}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-[110]
        pixel-card w-10 h-10 md:w-11 md:h-11
        flex items-center justify-center
        text-gray-500
        hover:border-[#22ff88] hover:text-[#22ff88]
        active:scale-95
        transition-all duration-200"
      style={{
        borderColor: muted ? '#2a2a35' : '#22ff88',
      }}
    >
      {muted ? (
        <FiVolumeX className="w-4 h-4" />
      ) : (
        <FiVolume2 className="w-4 h-4 text-[#22ff88]" />
      )}

      {/* نقطه‌ی پالس کوچیک وقتی روشنه */}
      {!muted && (
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#22ff88]
            animate-pulse shadow-[0_0_8px_#22ff88]"
        />
      )}
    </button>
  )
}