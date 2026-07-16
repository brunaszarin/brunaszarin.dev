'use client'

import { useEffect, useState } from 'react'
import { HomeIcon, UserIcon, MonitorIcon, MailIcon } from './nav-icons'
import styles from './mobile-tab-bar.module.css'

const TABS = [
  { id: 'home', label: 'home', Icon: HomeIcon },
  { id: 'about', label: 'about', Icon: UserIcon },
  { id: 'projects', label: 'projects', Icon: MonitorIcon },
  { id: 'contact', label: 'contact', Icon: MailIcon },
]

// A partir de quantos px de scroll a tab bar aparece — evita competir
// visualmente com os botões do Hero logo na primeira tela
const SHOW_THRESHOLD = 120

export function MobileTabBar() {
  const [active, setActive] = useState('home')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    function computeState() {
      ticking = false

      setVisible(window.scrollY > SHOW_THRESHOLD)

      const middle = window.scrollY + window.innerHeight / 2
      let current = TABS[0].id
      for (const tab of TABS) {
        const el = document.getElementById(tab.id)
        if (!el) continue
        if (middle >= el.offsetTop) {
          current = tab.id
        }
      }
      setActive(current)
    }

    function handleScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(computeState)
      }
    }

    computeState()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`${styles.bar} ${visible ? styles.visible : ''}`}
      aria-label="mobile navigation"
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            className={styles.item}
            onClick={() => scrollToSection(id)}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive && (
              <span className={`${styles.activeFill} ${styles.clip}`} aria-hidden="true" />
            )}
            <span className={`${styles.content} ${isActive ? styles.active : ''}`}>
              <Icon />
              <span className={styles.label}>{label}</span>
            </span>
          </button>
        )
      })}
    </nav>
  )
}
