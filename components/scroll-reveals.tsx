'use client'

import { useEffect } from 'react'

export function ScrollReveals() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      return
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    targets.forEach(target => {
      const delay = Number(target.dataset.revealDelay)
      if (Number.isFinite(delay) && delay > 0) {
        target.style.setProperty('--reveal-delay', `${Math.min(delay, 300)}ms`)
      }
      observer.observe(target)
    })

    document.documentElement.classList.add('has-scroll-reveals')

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('has-scroll-reveals')
      targets.forEach(target => {
        target.classList.remove('is-visible')
        target.style.removeProperty('--reveal-delay')
      })
    }
  }, [])

  return null
}
