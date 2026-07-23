'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '@/lib/gsap'
import styles from './pixel-transitions.module.css'

// Um boundary por seção "de chegada" — home não tem, já que é a primeira
const BOUNDARIES = ['about', 'projects', 'blog', 'contact']
const PIXEL_COUNT = 80

interface PixelConfig {
  left: number
  start: number
  end: number
}

function makePixels(): PixelConfig[] {
  return Array.from({ length: PIXEL_COUNT }, () => {
    // length primeiro, start depois como fração do espaço restante —
    // garante matematicamente que start + length nunca passa de 1.0
    const length = 0.6 + Math.random() * 0.3
    const start = Math.random() * (1 - length)
    return { left: Math.random() * 100, start, end: start + length }
  })
}

/**
 * Camada fixa por cima de todo o conteúdo, com uma "chuva" de pixels que
 * atravessa a tela exatamente na janela de scroll onde cada seção termina
 * e a próxima começa a aparecer — sem reservar nenhum espaço extra de
 * scroll (diferente da primeira tentativa, que usava uma zona vazia de
 * 150vh e parecia um "buraco" entre as seções). Renderizada via portal
 * direto no <body>, fora do wrapper do ScrollSmoother — assim como o
 * Navbar, position:fixed precisa ficar fora dessa árvore transformada.
 */
export function PixelTransitions() {
  const [mounted, setMounted] = useState(false)
  const pixelSets = useRef<Record<string, PixelConfig[]>>({})
  const pixelRefs = useRef<Record<string, (HTMLDivElement | null)[]>>({})

  BOUNDARIES.forEach((id) => {
    if (!pixelSets.current[id]) pixelSets.current[id] = makePixels()
    if (!pixelRefs.current[id]) pixelRefs.current[id] = []
  })

  useEffect(() => setMounted(true), [])

  useGSAP(() => {
    if (!mounted) return

    const lastProgress: Record<string, number> = {}

    const triggers = BOUNDARIES.map((id) => {
      const sectionEl = document.getElementById(id)
      if (!sectionEl) return null

      function drawFrame(progress: number) {
        // Um ScrollTrigger.refresh() em outro componente (ex: a BlogSection
        // recalculando quando os posts carregam) reavalia TODOS os triggers
        // da página, o que pode disparar onUpdate de novo aqui mesmo sem o
        // usuário ter rolado — ignora chamadas redundantes com o mesmo valor
        if (lastProgress[id] === progress) return
        lastProgress[id] = progress
        const stageH = window.innerHeight
        pixelSets.current[id].forEach((p, i) => {
          const el = pixelRefs.current[id][i]
          if (!el) return

          if (progress < p.start || progress > p.end) {
            el.style.opacity = '0'
            return
          }

          const local = (progress - p.start) / (p.end - p.start)
          const y = -10 + local * (stageH + 20)
          el.style.transform = `translateY(${y}px)`

          // Fade em curva suave (seno) — nasce em 0, sobe até 1 no meio
          // do trajeto, e volta a 0 no final, sem nenhum corte abrupto
          const opacity = Math.sin(Math.PI * local)
          el.style.opacity = String(Math.max(0, opacity))
        })
      }

      // Reembaralha as posições/janelas dos pixels — chamado sempre que
      // uma nova passada pela transição começa (tanto descendo quanto
      // subindo), pra cada vez que o efeito toca parecer diferente
      function reshuffle() {
        const fresh = makePixels()
        pixelSets.current[id] = fresh
        fresh.forEach((p, i) => {
          const el = pixelRefs.current[id][i]
          if (el) el.style.left = `${p.left}%`
        })
      }

      drawFrame(0)

      // Janela = exatamente 1 viewport de scroll natural: do momento em
      // que o topo da seção entra por baixo da tela até ela ficar no topo
      return ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
        onEnter: reshuffle,
        onEnterBack: reshuffle,
        onUpdate: (self) => drawFrame(self.progress),
      })
    })

    return () => triggers.forEach((t) => t?.kill())
  }, [mounted])

  if (!mounted) return null

  return createPortal(
    <div className={styles.overlay} aria-hidden="true">
      {BOUNDARIES.map((id) => (
        <div key={id} className={styles.layer}>
          {pixelSets.current[id].map((p, i) => (
            <div
              key={i}
              ref={(el) => {
                pixelRefs.current[id][i] = el
              }}
              className={styles.pixel}
              style={{ left: `${p.left}%` }}
            />
          ))}
        </div>
      ))}
    </div>,
    document.body
  )
}
