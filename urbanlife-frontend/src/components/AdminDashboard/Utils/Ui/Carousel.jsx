import React, { useCallback, useEffect, useState } from 'react'

const useEmblaCarousel = (options = {}) => {
  const [emblaRef, setEmblaRef] = useState(null)
  const [emblaApi, setEmblaApi] = useState(null)

  const assignRef = useCallback((node) => {
    if (node) {
      setEmblaRef(node)
      const container = node.querySelector('.embla__container')
      const slides = node.querySelectorAll('.embla__slide')
      
      let currentIndex = 0
      let isDragging = false
      let startX = 0
      let currentX = 0
      let autoplayInterval = null
      let totalSlides = slides.length

      // clone slides untuk infinite loop
      const cloneSlides = () => {
        const firstSlides = Array.from(slides).slice(0, 3)
        const lastSlides = Array.from(slides).slice(-3)
        lastSlides.reverse().forEach(slide => container.prepend(slide.cloneNode(true)))
        firstSlides.forEach(slide => container.append(slide.cloneNode(true)))
        totalSlides = container.querySelectorAll('.embla__slide').length
      }

      const updateTransform = (animate = true) => {
        const slideWidth = slides[0]?.offsetWidth || 0
        const offset = -(currentIndex + 3) * slideWidth // offset 3 karena klon
        if (container) {
          container.style.transition = animate ? 'transform 0.3s ease' : 'none'
          container.style.transform = `translateX(${offset}px)`
        }
      }

      const goToSlide = (index, animate = true) => {
        currentIndex = index
        if (currentIndex < 0) currentIndex = slides.length - 1
        if (currentIndex >= slides.length) currentIndex = 0
        updateTransform(animate)
      }

      const scrollNext = () => {
        currentIndex++
        updateTransform()
        if (currentIndex >= slides.length) {
          setTimeout(() => {
            currentIndex = 0
            updateTransform(false)
          }, 300)
        }
      }

      const scrollPrev = () => {
        currentIndex--
        updateTransform()
        if (currentIndex < 0) {
          setTimeout(() => {
            currentIndex = slides.length - 1
            updateTransform(false)
          }, 300)
        }
      }

      const handleStart = (e) => {
        isDragging = true
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX
        if (container) {
          container.style.transition = 'none'
        }
      }

      const handleMove = (e) => {
        if (!isDragging) return
        e.preventDefault()
        currentX = (e.type === 'mousemove' ? e.clientX : e.touches[0].clientX) - startX
        if (container) {
          const slideWidth = slides[0]?.offsetWidth || 0
          const offset = -(currentIndex + 3) * slideWidth + currentX
          container.style.transform = `translateX(${offset}px)`
        }
      }

      const handleEnd = () => {
        if (!isDragging) return
        isDragging = false
        
        if (container) {
          container.style.transition = 'transform 0.3s ease'
        }

        const threshold = 50
        if (Math.abs(currentX) > threshold) {
          if (currentX > 0) {
            scrollPrev()
          } else {
            scrollNext()
          }
        } else {
          updateTransform()
        }
        currentX = 0
      }

      if (container) {
        cloneSlides()
        container.addEventListener('mousedown', handleStart)
        container.addEventListener('touchstart', handleStart)
        document.addEventListener('mousemove', handleMove)
        document.addEventListener('touchmove', handleMove, { passive: false })
        document.addEventListener('mouseup', handleEnd)
        document.addEventListener('touchend', handleEnd)

        container.style.transition = 'transform 0.3s ease'
        updateTransform(false)
      }

      if (options.autoplay && options.autoplay.delay) {
        autoplayInterval = setInterval(() => {
          if (!isDragging) {
            scrollNext()
          }
        }, options.autoplay.delay)
      }

      const api = {
        scrollNext,
        scrollPrev,
        scrollTo: goToSlide,
        destroy: () => {
          if (autoplayInterval) clearInterval(autoplayInterval)
          if (container) {
            container.removeEventListener('mousedown', handleStart)
            container.removeEventListener('touchstart', handleStart)
            document.removeEventListener('mousemove', handleMove)
            document.removeEventListener('touchmove', handleMove)
            document.removeEventListener('mouseup', handleEnd)
            document.removeEventListener('touchend', handleEnd)
          }
        }
      }

      setEmblaApi(api)

      return () => {
        api.destroy()
      }
    }
  }, [])

  return [assignRef, emblaApi]
}

const Carousel = ({ 
  children, 
  autoplay = false, 
  autoplayDelay = 3000,
  className = "",
  slideClassName = ""
}) => {
  const options = {
    loop: true,
    ...(autoplay && { autoplay: { delay: autoplayDelay } })
  }

  const [emblaRef] = useEmblaCarousel(options)

  return (
    <div className={`embla ${className}`}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {React.Children.map(children, (child, index) => (
            <div key={index} className={`embla__slide ${slideClassName}`}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .embla {
          overflow: hidden;
          position: relative;
          width: 100%;
          padding: 0 10px; /* biar ga terlalu mepet */
        }
        
        .embla__viewport {
          overflow: hidden;
          cursor: grab;
          width: 100%;
        }
        
        .embla__viewport:active {
          cursor: grabbing;
        }
        
        .embla__container {
          display: flex;
          user-select: none;
          -webkit-touch-callout: none;
          -khtml-user-select: none;
          -webkit-tap-highlight-color: transparent;
          width: 100%;
          padding: 0 10px;
        }
        
        .embla__slide {
          position: relative;
          min-width: 100%; /* 1 slide penuh di mobile */
          flex: 0 0 100%;
          box-sizing: border-box;
          padding: 0 5px; /* Jarak antar card */
        }

        @media (min-width: 768px) {
          .embla {
            padding: 0 20px;
          }
          .embla__container {
            padding: 0 20px;
          }
          .embla__slide {
            min-width: calc(100% / 3); /* 3 slide di desktop */
            flex: 0 0 calc(100% / 3);
            padding: 0 10px;
          }
        }
      `}</style>
    </div>
  )
}

export default Carousel