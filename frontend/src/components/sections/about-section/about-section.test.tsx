import { render, screen } from '@testing-library/react'
import { AboutSection } from './about-section'

jest.mock('@/hooks/useScrollParallax', () => ({
  useScrollParallax: () => ({ elementRef: { current: null }, offset: 0 }),
}))
jest.mock('@/hooks/useFadeIn', () => ({
  useFadeIn: () => ({ ref: { current: null }, isVisible: true }),
}))
jest.mock('../parallax-background', () => ({
  ParallaxBackground: () => <div data-testid="parallax-bg" />,
}))

describe('AboutSection', () => {
  it('renders the title and bio text', () => {
    render(<AboutSection />)
    expect(screen.getByText('nice to meet you')).toBeInTheDocument()
    expect(screen.getByText(/frontend-focused Fullstack Developer/i)).toBeInTheDocument()
  })

  it('renders the parallax background', () => {
    render(<AboutSection />)
    expect(screen.getByTestId('parallax-bg')).toBeInTheDocument()
  })

  it('applies is-visible class when useFadeIn reports visible', () => {
    const { container } = render(<AboutSection />)
    expect(container.querySelector('.is-visible')).toBeInTheDocument()
  })
})
