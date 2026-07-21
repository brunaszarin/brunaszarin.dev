import { EXPERIENCES } from '@/data/experiences'
import { CompanyBuilding } from './company-building'
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

// Largura do card (precisa bater com company-card.module.css .card)
const CARD_WIDTH = 280
// Margem de segurança extra pra garantir que o card saiu de vez da tela,
// independente do tamanho do dispositivo
const EXIT_MARGIN = 60

// O mundo termina de deslizar em 85% do scroll (o resto é pro gato sair)
const WORLD_END = 0.85

// Calcula o deslocamento horizontal do mundo pra um dado progresso —
// extraído como função própria pra outras camadas (tipo o skyline de
// prédios) poderem sincronizar o próprio movimento com o mesmo valor,
// sem duplicar a fórmula.
export function getWorldShift(progress: number) {
  const worldProgress = Math.min(1, progress / WORLD_END)
  const lastCardRightEdge = stopX(EXPERIENCES.length - 1) + 60 + CARD_WIDTH
  const maxShift = lastCardRightEdge + EXIT_MARGIN - CAT_ANCHOR
  return worldProgress * maxShift
}

interface WorldStripProps {
  progress: number
}

export function WorldStrip({ progress }: WorldStripProps) {
  const shift = getWorldShift(progress)

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
        // Quão "ativa" está esta empresa (o gato está na frente dela?)
        const catWorldX = shift + CAT_ANCHOR
        const distance = Math.abs(catWorldX - stopX(i))
        const isActive = distance < STOP_SPACING / 2.2

        return (
          <div key={exp.id}>
            {/* Prédio */}
            <div
              className={styles.house}
              style={{ left: `${stopX(i) - 90}px` }}
            >
              <CompanyBuilding />
            </div>

            {/* Card com detalhes */}
            <div
              className={`${styles.cardSlot} ${isActive ? styles.cardActive : ''}`}
              style={{ left: `${stopX(i) + 60}px` }}
            >
              <CompanyCard experience={exp} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
