"use client"

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.06, ease: 'power2.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.06, ease: 'power2.out' })

    let firstMove = true

    const onMouseMove = (e: MouseEvent) => {
      if (firstMove) {
        setIsVisible(true)
        firstMove = false
      }
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, .cursor-pointer'
      )
      setIsHovering(!!interactive)
    }

    const onMouseDown = () => setIsPressed(true)
    const onMouseUp = () => setIsPressed(false)
    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999]
        transition-opacity duration-150
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ transformOrigin: '0 0' }}
    >
      <svg
        width="16"
        height="23"
        viewBox="0 0 10 14"
        shapeRendering="crispEdges"
        className={`transition-all duration-100
          ${isHovering ? 'text-[#ffd60a]' : 'text-[#22ff88]'}
        `}
        style={{
          filter: isHovering
            ? 'drop-shadow(0 0 4px #ffd60a) drop-shadow(0 0 10px rgba(255,214,10,0.6))'
            : 'drop-shadow(2px 2px 0 rgba(0,0,0,0.85))',
          transform: isPressed ? 'scale(0.85)' : 'scale(1)',
          transformOrigin: '0 0',
          transition: 'filter 0.15s, transform 0.1s',
        }}
      >
        {/* فلش پیکسلی کلاسیک */}
        <path
          d="M0 0 L0 11 L3 8 L5 13 L7 12 L5 7 L9 7 Z"
          fill="currentColor"
          stroke="#0a0a0f"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}