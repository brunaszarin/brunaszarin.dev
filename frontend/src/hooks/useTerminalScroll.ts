import { useEffect, useRef, useState } from 'react'

// Fração do scroll total usada pra "ligar"/"desligar" a TV em cada ponta
const POWER_RAMP = 0.28

export function useTerminalScroll(itemCount: number) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [powerLevel, setPowerLevel] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let ticking = false

    function compute() {
      ticking = false
      const viewportH = window.innerHeight
      const scrollableDistance = section!.offsetHeight - viewportH
      const scrolled = -section!.getBoundingClientRect().top
      const raw = scrollableDistance > 0 ? scrolled / scrollableDistance : 0
      const p = Math.min(1, Math.max(0, raw))
      setProgress(p)

      // Simétrico: 0 nas duas pontas, sobe pra 1 dentro da "zona ligada"
      const power = Math.min(1, Math.min(p, 1 - p) / POWER_RAMP)
      setPowerLevel(power)

      if (itemCount > 0) {
        const zoneStart = POWER_RAMP
        const zoneEnd = 1 - POWER_RAMP
        const zoneSize = zoneEnd - zoneStart
        if (p <= zoneStart || p >= zoneEnd || zoneSize <= 0) {
          setSelectedIndex(-1)
        } else {
          const local = (p - zoneStart) / zoneSize
          setSelectedIndex(Math.min(itemCount - 1, Math.floor(local * itemCount)))
        }
      }
    }

    function handleScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(compute)
      }
    }

    compute()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [itemCount])

  return { sectionRef, progress, powerLevel, selectedIndex }
}
