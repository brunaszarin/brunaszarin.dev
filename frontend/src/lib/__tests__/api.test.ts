import { api } from '../api'

describe('api client', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('get', () => {
    it('retorna os dados quando a requisição é bem-sucedida', async () => {
      // Arrange
      const mockData = { id: 1, title: 'Post de teste' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      // Act
      const result = await api.get('/api/posts/1')

      // Assert
      expect(result).toEqual(mockData)
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/posts/1',
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
        })
      )
    })

    it('lança um erro quando a resposta não é ok', async () => {
      // Arrange
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => 'post não encontrado',
      })

      // Act & Assert
      await expect(api.get('/api/posts/999')).rejects.toThrow(
        'post não encontrado'
      )
    })
  })

  describe('post', () => {
    it('envia o body como JSON e retorna a resposta', async () => {
      // Arrange
      const requestBody = { name: 'Bruna', email: 'bruna@test.com', message: 'oi' }
      const mockResponse = { message: 'enviado com sucesso' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      // Act
      const result = await api.post('/api/contact', requestBody)

      // Assert
      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/contact',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestBody),
        })
      )
    })
  })
})