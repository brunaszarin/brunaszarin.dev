import { renderHook, waitFor } from '@testing-library/react'
import { useContact } from '../useContact'
import { api } from '@/lib/api'
import { createWrapper } from '@/test-utils/createWrapper'

jest.mock('@/lib/api')

describe('useContact', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('envia o formulário e expõe sucesso', async () => {
    // Arrange
    const formData = {
      name: 'Bruna',
      email: 'bruna@test.com',
      message: 'olá, tudo bem?',
    }
    const mockResponse = { message: 'enviado com sucesso' }
    ;(api.post as jest.Mock).mockResolvedValueOnce(mockResponse)

    // Act
    const { result } = renderHook(() => useContact(), {
      wrapper: createWrapper(),
    })
    result.current.mutate(formData)

    // Assert
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual(mockResponse)
    expect(api.post).toHaveBeenCalledWith('/api/contact', formData)
  })

  it('expõe o estado de erro quando o envio falha', async () => {
    // Arrange
    const formData = {
      name: 'Bruna',
      email: 'bruna@test.com',
      message: 'olá',
    }
    ;(api.post as jest.Mock).mockRejectedValueOnce(new Error('erro no envio'))

    // Act
    const { result } = renderHook(() => useContact(), {
      wrapper: createWrapper(),
    })
    result.current.mutate(formData)

    // Assert
    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toEqual(new Error('erro no envio'))
  })
})