"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type ScrollToTarget = string | number | HTMLElement
type ScrollToOptions = Parameters<Lenis['scrollTo']>[1]

type SmoothScrollContextValue = {
  lenis: Lenis | null
  scrollTo: (target: ScrollToTarget, opts?: ScrollToOptions) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
})

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    gsap.registerPlugin(ScrollTrigger)

    const instance = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    })

    setLenis(instance)

    instance.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(raf)

    // ⭐ refresh بعد از اینکه layout settle شد
    // (بعد از pin-spacer ها و فونت‌ها و تصاویر)
    const refreshAfterMount = gsap.delayedCall(0.5, () => {
      ScrollTrigger.refresh()
    })

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const anchor = target.closest('a[href*="#"]') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href') || ''
      const [path, hash] = href.split('#')
      if (!hash) return

      const currentPath = window.location.pathname
      if (path && path !== currentPath) return

      const el = document.getElementById(hash)
      if (!el) return

      e.preventDefault()
      instance.scrollTo(el, { offset: -20, duration: 1.4 })
    }

    document.addEventListener('click', handleAnchorClick, true)

    // ⭐ refresh بعد از لود کامل تصاویر و فونت‌ها
    const handleWindowLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', handleWindowLoad)

    return () => {
      document.removeEventListener('click', handleAnchorClick, true)
      window.removeEventListener('load', handleWindowLoad)
      refreshAfterMount.kill()
      gsap.ticker.remove(raf)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  const scrollTo = useCallback(
    (target: ScrollToTarget, opts?: ScrollToOptions) => {
      if (!lenis) return
      lenis.scrollTo(target, { offset: -20, duration: 1.4, ...opts })
    },
    [lenis]
  )

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}