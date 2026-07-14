import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PixelInput } from './pixel-input'

describe('PixelInput', () => {
  it('renders an input by default, associated with its label', () => {
    render(<PixelInput label="Name" name="name" />)
    const input = screen.getByLabelText('Name')
    expect(input.tagName).toBe('INPUT')
    expect(input).toHaveAttribute('id', 'name')
  })

  it('renders a textarea when multiline is true', () => {
    render(<PixelInput label="Message" name="message" multiline />)
    const textarea = screen.getByLabelText('Message')
    expect(textarea.tagName).toBe('TEXTAREA')
    expect(textarea).toHaveAttribute('rows', '4')
  })

  it('accepts typed input', async () => {
    render(<PixelInput label="Email" name="email" />)
    const input = screen.getByLabelText('Email')
    await userEvent.type(input, 'bruna@test.com')
    expect(input).toHaveValue('bruna@test.com')
  })

  it('forwards extra props like placeholder and required', () => {
    render(<PixelInput label="Name" name="name" placeholder="your name" required />)
    const input = screen.getByLabelText('Name')
    expect(input).toHaveAttribute('placeholder', 'your name')
    expect(input).toBeRequired()
  })
})
