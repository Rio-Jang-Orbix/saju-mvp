'use client'

import { useState, useEffect, ReactNode } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface SlideNavigationProps {
  slides: ReactNode[]
  className?: string
}

export function SlideNavigation({ slides, className = '' }: SlideNavigationProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length && !isAnimating) {
      setIsAnimating(true)
      setCurrentSlide(index)
      setTimeout(() => setIsAnimating(false), 600)
    }
  }

  const goToNext = () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1)
    }
  }

  const goToPrevious = () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault()
        goToNext()
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault()
        goToPrevious()
      } else if (event.key >= '1' && event.key <= '9') {
        const slideIndex = parseInt(event.key) - 1
        if (slideIndex < slides.length) {
          goToSlide(slideIndex)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide, slides.length])

  // Wheel and Touch navigation
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout
    let touchStartY = 0
    let touchEndY = 0
    let isTouching = false

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()

      clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => {
        if (event.deltaY > 0) {
          goToNext()
        } else if (event.deltaY < 0) {
          goToPrevious()
        }
      }, 50)
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        touchStartY = event.touches[0].clientY
        isTouching = true
      }
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!isTouching || event.touches.length !== 1) return

      // Prevent default scrolling during slide navigation
      event.preventDefault()
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (!isTouching) return

      touchEndY = event.changedTouches[0].clientY
      const touchDiff = touchStartY - touchEndY
      const minSwipeDistance = 50

      if (Math.abs(touchDiff) > minSwipeDistance) {
        if (touchDiff > 0) {
          // Swiped up - go to next slide
          goToNext()
        } else {
          // Swiped down - go to previous slide
          goToPrevious()
        }
      }

      isTouching = false
    }

    // Wheel events
    window.addEventListener('wheel', handleWheel, { passive: false })

    // Touch events for mobile
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      clearTimeout(wheelTimeout)
    }
  }, [currentSlide, slides.length])

  return (
    <div className={`relative h-screen overflow-hidden ${className}`}>
      {/* Slides Container */}
      <div
        className="flex flex-col h-full transition-transform duration-600 ease-in-out"
        style={{
          transform: `translateY(-${currentSlide * 100}vh)`
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="h-screen flex-shrink-0 w-full flex items-center justify-center"
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 touch-target touch-feedback ${
              index === currentSlide
                ? 'bg-luxury-gold shadow-lg scale-125'
                : 'bg-luxury-bronze/30 hover:bg-luxury-bronze/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="fixed right-8 bottom-8 z-50 flex flex-col gap-2">
        {currentSlide > 0 && (
          <button
            onClick={goToPrevious}
            className="w-12 h-12 luxury-glass rounded-full flex items-center justify-center hover:bg-luxury-gold/20 transition-all duration-300 group touch-target touch-feedback"
            aria-label="Previous slide"
          >
            <ChevronUp className="w-6 h-6 text-luxury-gold group-hover:scale-110 transition-transform" />
          </button>
        )}
        {currentSlide < slides.length - 1 && (
          <button
            onClick={goToNext}
            className="w-12 h-12 luxury-glass rounded-full flex items-center justify-center hover:bg-luxury-gold/20 transition-all duration-300 group touch-target touch-feedback"
            aria-label="Next slide"
          >
            <ChevronDown className="w-6 h-6 text-luxury-gold group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      {/* Slide Counter */}
      <div className="fixed bottom-8 left-8 z-50 luxury-glass rounded-full px-4 py-2">
        <span className="text-luxury-charcoal font-medium text-sm">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </div>
  )
}