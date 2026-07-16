import { render, screen } from '@testing-library/react'
import { LogoMarquee } from './logo-marquee'

describe('LogoMarquee', () => {
  it('renders the section title', () => {
    render(<LogoMarquee />)
    expect(screen.getByText(/some of the brands/i)).toBeInTheDocument()
  })

  it('duplicates the logo list for the infinite loop effect', () => {
    render(<LogoMarquee />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(20)
  })

  it('uses the brand name as alt and title text', () => {
    render(<LogoMarquee />)
    const serasaImages = screen.getAllByAltText('Serasa Experian')
    expect(serasaImages).toHaveLength(2)
    expect(serasaImages[0]).toHaveAttribute('title', 'Serasa Experian')
  })
})
