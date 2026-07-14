import { render, screen } from '@testing-library/react'
import { FloatingElements } from './floating-elements'

describe('FloatingElements', () => {
  it('renders the 4 code symbols and 3 sparkles', () => {
    render(<FloatingElements />)
    expect(screen.getByText('{')).toBeInTheDocument()
    expect(screen.getByText('>')).toBeInTheDocument()
    expect(screen.getByText('{ }')).toBeInTheDocument()
    expect(screen.getByText('/')).toBeInTheDocument()
    expect(screen.getAllByText('✦')).toHaveLength(3)
  })

  it('is aria-hidden since it is purely decorative', () => {
    const { container } = render(<FloatingElements />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })
})
