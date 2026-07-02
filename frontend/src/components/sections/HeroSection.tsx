'use client'

import Image from 'next/image'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { ParallaxBackground } from './ParallaxBackground'
import { PixelButton } from '@/components/ui/PixelButton'
import styles from './HeroSection.module.css'

export function HeroSection() {
  const { containerRef, offset } = useMouseParallax()

  return (
    <section ref={containerRef} className={styles.hero}>
      <ParallaxBackground offset={offset} />

      <div className={styles.content}>
        {/* Texto à esquerda */}
        <div
          className={styles.text}
          style={{
            transform: `translate(${offset.x * -5}px, ${offset.y * -5}px)`,
          }}
        >
          <p className={styles.tag}>hi, i'm bruna szarin 👋🏻</p>
          <h1 className={styles.title}>
            a fullstack software engineer.
          </h1>
          <p className={styles.subtitle}>
           I build things for the web (and pet cats)

          </p>
          <div className={styles.buttons}>
            <PixelButton variant="green">my work</PixelButton>
            <PixelButton variant="ghost">about me</PixelButton>
          </div>
        </div>

        {/* Gatinho à direita — flutua e reage ao mouse */}
        <div
          className={styles.catWrap}
          style={{
            transform: `translate(${offset.x * 20}px, ${offset.y * 20}px)`,
          }}
        >
          <Image
            src="/assets/sudo-gatinho.png"
            alt="sudo-gatinho, mascote pixel art"
            width={220}
            height={209}
            className={styles.cat}
            priority
          />
        </div>
      </div>
    </section>
  )
}