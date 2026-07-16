import { render } from '@testing-library/react'
import { ParallaxBackground } from './parallax-background'

describe('ParallaxBackground', () => {
  it('renders layers after mount effect resolves', () => {
    const { container } = render(<ParallaxBackground offset={{ x: 0, y: 0 }} />)
    const layers = container.querySelectorAll('div')
    expect(layers.length).toBeGreaterThan(0)
  })

  it('renders 3 particle layers (30 + 18 + 10 particles)', () => {
    const { container } = render(<ParallaxBackground offset={{ x: 0, y: 0 }} />)
    const particles = container.querySelectorAll('span')
    expect(particles).toHaveLength(30 + 18 + 10)
  })

  it('is aria-hidden as a purely decorative element', () => {
    const { container } = render(<ParallaxBackground offset={{ x: 0, y: 0 }} />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies translate transform based on offset', () => {
    const { container } = render(<ParallaxBackground offset={{ x: 2, y: 3 }} />)
    const firstLayer = container.querySelector('.layer, [class*="layer"]') as HTMLElement
    expect(firstLayer.style.transform).toBe('translate(24px, 36px)')
  })
})
