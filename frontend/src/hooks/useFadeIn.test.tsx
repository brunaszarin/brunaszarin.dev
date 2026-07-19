import { renderHook, act } from '@testing-library/react'
import { useFadeIn } from './useFadeIn'

// Mock controlável do IntersectionObserver — captura o callback registrado
// pra podermos disparar manualmente um "elemento entrou na tela"
let observerCallback: IntersectionObserverCallback | null = null
let observeMock: jest.Mock
let disconnectMock: jest.Mock

beforeEach(() => {
  observeMock = jest.fn()
  disconnectMock = jest.fn()

  global.IntersectionObserver = jest.fn((callback: IntersectionObserverCallback) => {
    observerCallback = callback
    return {
      observe: observeMock,
      disconnect: disconnectMock,
      unobserve: jest.fn(),
      takeRecords: jest.fn(),
      root: null,
      rootMargin: '',
      thresholds: [],
    }
  }) as unknown as typeof IntersectionObserver
})

function triggerIntersection(isIntersecting: boolean) {
  act(() => {
    observerCallback?.(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver
    )
  })
}

describe('useFadeIn', () => {
  it('starts as not visible', () => {
    const { result } = renderHook(() => useFadeIn())
    expect(result.current.isVisible).toBe(false)
  })

  it('does not observe anything until the ref is attached to an element', () => {
    renderHook(() => useFadeIn())
    // Sem elemento atribuído ao ref, o observer nunca chega a ser criado
    expect(observeMock).not.toHaveBeenCalled()
  })

  it('becomes visible once the observed element intersects the viewport', () => {
    const { result } = renderHook(() => {
      const fade = useFadeIn<HTMLDivElement>()
      // Simula o ref sendo atribuído a um elemento real, como o React faz
      if (!fade.ref.current) {
        fade.ref.current = document.createElement('div')
      }
      return fade
    })

    expect(result.current.isVisible).toBe(false)

    triggerIntersection(true)

    expect(result.current.isVisible).toBe(true)
  })

  it('uses the default threshold of 0.15 when none is provided', () => {
    renderHook(() => {
      const fade = useFadeIn<HTMLDivElement>()
      if (!fade.ref.current) {
        fade.ref.current = document.createElement('div')
      }
      return fade
    })

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.15 }
    )
  })

  it('accepts a custom threshold', () => {
    renderHook(() => {
      const fade = useFadeIn<HTMLDivElement>(0.5)
      if (!fade.ref.current) {
        fade.ref.current = document.createElement('div')
      }
      return fade
    })

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.5 }
    )
  })

  it('disconnects the observer on unmount', () => {
    const { unmount } = renderHook(() => {
      const fade = useFadeIn<HTMLDivElement>()
      if (!fade.ref.current) {
        fade.ref.current = document.createElement('div')
      }
      return fade
    })

    unmount()

    expect(disconnectMock).toHaveBeenCalled()
  })
})
