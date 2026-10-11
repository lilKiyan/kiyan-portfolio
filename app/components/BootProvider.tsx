"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import BootScreen from './BootScreen'

type BootContextValue = { booted: boolean }

const BootContext = createContext<BootContextValue>({ booted: false })

export function useBoot() {
  return useContext(BootContext)
}

export default function BootProvider({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false)
  const [showBoot, setShowBoot] = useState(false)

  useEffect(() => {
    const seen =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('booted')
        : null

    if (seen) {
      setBooted(true)
    } else {
      setShowBoot(true)
    }
  }, [])

  const handleFinish = () => {
    try {
      sessionStorage.setItem('booted', 'true')
    } catch {
    }
    setBooted(true)
    setShowBoot(false)
  }

  return (
    <BootContext.Provider value={{ booted }}>
      {showBoot && <BootScreen onFinish={handleFinish} />}
      {children}
    </BootContext.Provider>
  )
}