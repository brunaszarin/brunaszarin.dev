'use client'

import { useEffect, useState } from 'react'
import { EXPERIENCES } from '@/data/experiences'
import { CompanyHouse } from './company-house'
import { CompanyCard } from './company-card'
import styles from './world-strip.module.css'

// Distância entre cada empresa (em px na faixa do mundo)
const STOP_SPACING = 620
// Onde a primeira empresa começa
const FIRST_STOP = 400
// Largura total da faixa do mundo
export const WORLD_WIDTH =
  FIRST_STOP + STOP_SPACING * (EXPERIENCES.length - 1) + 2000

// A posição X de cada empresa na faixa
export function stopX(index: number) {
  return FIRST_STOP + index * STOP_SPACING
}

// Onde o gato fica fixo na tela (px da esquerda)
export const CAT_ANCHOR = 140

// Largura fixa do CompanyCard (definida em company-card.module.css)
const CARD_WIDTH = 280
// Distância do card em relação à casinha (ver "left" do cardSlot abaixo)
const CARD_OFFSET_FROM_HOUSE = 60
// Respiro entre a borda direita do card e a borda da tela
const SCREEN_MARGIN = 24
// Offset máximo (calibrado pro desktop) — nunca ultrapassa isso
const MAX_OFFSET = 340

interface WorldStripProps {
  progress: number
}

export function WorldStrip({ progress }: WorldStripProps) {
  const [viewportWidth, setViewportWidth] = useState<number | null>(null)

  useEffect(() => {
    function updateWidth() {
      setViewportWidth(window.innerWidth)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // O mundo termina de deslizar em 85% do scroll (o resto é pro gato sair)
  const WORLD_END = 0.85
  const worldProgress = Math.min(1, progress / WORLD_END)

  // Calcula o offset final que faz o card inteiro caber na tela,
  // seja qual for a largura — não é um valor fixo por dispositivo.
  // Dedução: posição do card na tela = CARD_OFFSET_FROM_HOUSE + finalOffset
  // Queremos: posição + CARD_WIDTH <= viewportWidth - SCREEN_MARGIN
  const finalOffset = viewportWidth
    ? Math.min(
        MAX_OFFSET,
        viewportWidth - SCREEN_MARGIN - CARD_WIDTH - CARD_OFFSET_FROM_HOUSE
      )
    : MAX_OFFSET

  const maxShift = stopX(EXPERIENCES.length - 1) - finalOffset
  const shift = worldProgress * maxShift

  return (
    <div
      className={styles.world}
      style={{
        width: `${WORLD_WIDTH}px`,
        transform: `translateX(${-shift}px)`,
      }}
    >
      {/* Chão */}
      <div className={styles.ground} />
      <div className={styles.groundTop} />

      {/* Casinhas + cards de cada empresa */}
      {EXPERIENCES.map((exp, i) => {
        const catWorldX = shift + CAT_ANCHOR
        const distance = Math.abs(catWorldX - stopX(i))
        const isActive = distance < STOP_SPACING / 2.2

        return (
          <div key={exp.id}>
            <div
              className={styles.house}
              style={{ left: `${stopX(i) - 70}px` }}
            >
              <CompanyHouse />
            </div>

            <div
              className={`${styles.cardSlot} ${isActive ? styles.cardActive : ''}`}
              style={{ left: `${stopX(i) + CARD_OFFSET_FROM_HOUSE}px` }}
            >
              <CompanyCard experience={exp} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
