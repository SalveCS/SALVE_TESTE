import React, { useState, useRef, useEffect } from 'react'
import { getOptimizedImageSrc } from '../utils/imageOptimization'

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  lazy = true, 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DYXJyZWdhbmRvLi4uPC90ZXh0Pjwvc3ZnPg==',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(!lazy)
  const [imageSrc, setImageSrc] = useState(lazy ? placeholder : getOptimizedImageSrc(src))
  const imgRef = useRef(null)

  useEffect(() => {
    if (!lazy) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [lazy])

  useEffect(() => {
    if (isInView && lazy) {
      setImageSrc(getOptimizedImageSrc(src))
    }
  }, [isInView, src, lazy])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    // Fallback to original image if WebP fails
    if (imageSrc.includes('.webp')) {
      setImageSrc(src)
    }
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading={lazy ? 'lazy' : 'eager'}
        {...props}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Carregando...</div>
        </div>
      )}
    </div>
  )
}

export default OptimizedImage

