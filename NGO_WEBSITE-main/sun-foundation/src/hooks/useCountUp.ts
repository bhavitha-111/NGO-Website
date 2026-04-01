import { useState, useEffect, useRef } from "react"

interface UseCountUpOptions {
  end: number
  duration?: number
  start?: number
  decimals?: number
}

export function useCountUp({ end, duration = 2000, start = 0, decimals = 0 }: UseCountUpOptions) {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement | null>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          setIsVisible(true)
          hasStarted.current = true
        }
      },
      { threshold: 0.3 }
    )

    const currentRef = ref.current
    if (currentRef) observer.observe(currentRef)
    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease out cubic
      const current = start + eased * (end - start)
      setCount(parseFloat(current.toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [isVisible, end, start, duration, decimals])

  return { count, ref }
}
