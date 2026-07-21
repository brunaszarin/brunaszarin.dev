import { getWorldShift } from './world-strip'
import styles from './buildings-skyline.module.css'

interface BuildingsSkylineProps {
  progress: number
}

// Fator de paralaxe: os prédios se movem bem mais devagar que o mundo em
// primeiro plano, e na direção OPOSTA — reforça a sensação de profundidade,
// como se ficassem "pra trás" enquanto o gato caminha pra frente.
const PARALLAX_FACTOR = -0.15

export function BuildingsSkyline({ progress }: BuildingsSkylineProps) {
  const worldShift = getWorldShift(progress)

  return (
    <div
      className={styles.skyline}
      style={{ transform: `translateX(${worldShift * PARALLAX_FACTOR}px)` }}
      aria-hidden="true"
    />
  )
}
