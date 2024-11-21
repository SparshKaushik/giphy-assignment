import { useEffect, useRef, useState } from 'react'
import { Dimensions } from 'react-native'

interface UseIsInViewProps {
  elementRef: React.RefObject<any>
  disabled?: boolean
  delay?: number
  onChange: (isVisible: boolean) => void
}

export function useIsInView({
  elementRef,
  disabled = false,
  delay = 100,
  onChange
}: UseIsInViewProps) {
  const [rect, setRect] = useState({ top: 0, bottom: 0, width: 0 })
  const lastValueRef = useRef<boolean | null>(null)
  const intervalRef = useRef<NodeJS.Timer>()

  const isInViewPort = () => {
    const window = Dimensions.get('window')
    const isVisible =
      rect.bottom !== 0 &&
      rect.top >= 0 &&
      rect.bottom <= window.height &&
      rect.width > 0 &&
      rect.width <= window.width

    if (lastValueRef.current !== isVisible) {
      lastValueRef.current = isVisible
      onChange(isVisible)
    }
  }

  const startWatching = () => {
    if (intervalRef.current) {
      return
    }

    intervalRef.current = setInterval(() => {
      if (!elementRef.current) {
        return
      }

      elementRef.current.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        setRect({
          top: pageY,
          bottom: pageY + height,
          width: pageX + width
        })
      })
      isInViewPort()
    }, delay)
  }

  const stopWatching = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current as NodeJS.Timeout)
      intervalRef.current = undefined
    }
  }

  useEffect(() => {
    if (!disabled) {
      startWatching()
    }
    return () => stopWatching()
  }, [disabled])

  return null
}