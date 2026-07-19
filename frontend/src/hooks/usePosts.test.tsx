import { renderHook, waitFor } from '@testing-library/react'
import { usePosts } from './usePosts'
import { api } from '@/lib/api'
import { createWrapper } from '@/test-utils/createWrapper'

jest.mock('@/lib/api')

describe('usePosts', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('retorna a lista de posts em caso de sucesso', async () => {
    // Arrange
    const mockPosts = [
      { id: 1, title: 'Primeiro post', slug: 'primeiro-post' },
      { id: 2, title: 'Segundo post', slug: 'segundo-post' },
    ]
    ;(api.get as jest.Mock).mockResolvedValueOnce(mockPosts)

    // Act
    const { result } = renderHook(() => usePosts(), {
      wrapper: createWrapper(),
    })

    // Assert
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual(mockPosts)
    expect(api.get).toHaveBeenCalledWith('/api/posts')
  })

  it('expõe o estado de erro quando a requisição falha', async () => {
    // Arrange
    ;(api.get as jest.Mock).mockRejectedValueOnce(new Error('falhou'))

    // Act
    const { result } = renderHook(() => usePosts(), {
      wrapper: createWrapper(),
    })

    // Assert
    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toEqual(new Error('falhou'))
  })
})