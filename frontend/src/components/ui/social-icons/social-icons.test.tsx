import { render } from '@testing-library/react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './social-icons'

describe('social icons', () => {
  it('renders GithubIcon as an svg with aria-hidden', () => {
    const { container } = render(<GithubIcon className="foo" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).toHaveClass('foo')
  })

  it('renders LinkedinIcon as an svg', () => {
    const { container } = render(<LinkedinIcon />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders InstagramIcon as an svg', () => {
    const { container } = render(<InstagramIcon />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
