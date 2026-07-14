import { render, screen } from '@testing-library/react'
import { Tooltip } from './tooltip'

describe('Tooltip', () => {
  it('renders the children content', () => {
    render(
      <Tooltip text="Dica">
        <button>Hover me</button>
      </Tooltip>
    )

    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument()
  })

  it('renders the tooltip text', () => {
    render(
      <Tooltip text="Informação importante">
        <span>Trigger</span>
      </Tooltip>
    )

    expect(screen.getByRole('tooltip')).toHaveTextContent('Informação importante')
  })

  it('defaults to position "top" and align "center"', () => {
    render(
      <Tooltip text="Padrão">
        <span>Trigger</span>
      </Tooltip>
    )

    const tooltip = screen.getByRole('tooltip')
    expect(tooltip.className).toMatch(/top/)
    expect(tooltip.className).not.toMatch(/alignRight/)
  })

  it('applies the given position class', () => {
    render(
      <Tooltip text="Embaixo" position="bottom">
        <span>Trigger</span>
      </Tooltip>
    )

    const tooltip = screen.getByRole('tooltip')
    expect(tooltip.className).toMatch(/bottom/)
  })

  it('applies the alignRight class when align is "right"', () => {
    render(
      <Tooltip text="Alinhado" align="right">
        <span>Trigger</span>
      </Tooltip>
    )

    const tooltip = screen.getByRole('tooltip')
    expect(tooltip.className).toMatch(/alignRight/)
  })

  it('renders an arrow matching the position', () => {
    const { container } = render(
      <Tooltip text="Seta" position="left">
        <span>Trigger</span>
      </Tooltip>
    )

    const arrow = container.querySelector('[aria-hidden="true"]')
    expect(arrow).toBeInTheDocument()
    expect(arrow?.className).toMatch(/arrow_left/)
  })
})