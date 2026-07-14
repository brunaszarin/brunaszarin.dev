import { render, screen, fireEvent, act } from '@testing-library/react'
import { Navbar } from './navbar'

describe('Navbar', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('renders the logo and all nav links', () => {
    render(<Navbar />)
    expect(screen.getByText('cat')).toBeInTheDocument()
    ;['home', 'about', 'projects', 'contact'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('renders the CV download link with tooltip', () => {
    render(<Navbar />)
    const link = screen.getByLabelText('download my cv')
    expect(link).toHaveAttribute('href', '/curriculo.pdf')
    expect(link).toHaveAttribute('download')
    expect(screen.getByRole('tooltip')).toHaveTextContent('download my cv here')
  })

  it('scrolls to the target section when a link is clicked', () => {
    const section = document.createElement('div')
    section.id = 'about'
    section.scrollIntoView = jest.fn()
    document.body.appendChild(section)

    render(<Navbar />)
    fireEvent.click(screen.getByText('about'))
    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('adds the scrolled class after scrolling past 20px', () => {
    const { container } = render(<Navbar />)
    const nav = container.querySelector('nav')
    expect(nav?.className).not.toMatch(/scrolled/)

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(nav?.className).toMatch(/scrolled/)
  })
})
