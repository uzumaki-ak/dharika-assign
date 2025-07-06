"use client"

import { useState, useEffect } from "react"

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Placeholder images representing Indian ethnic fashion
  const images = [
    {
      url: "https://plus.unsplash.com/premium_photo-1720798651859-02591c1bd299?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Traditional Indian Indian Saree",
      caption: "Timeless Elegance",
    },
    {
      url: "https://images.unsplash.com/photo-1601291415700-e5d34e15f7f3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Modern Indian Fashion",
      caption: "Contemporary Grace",
    },
    {
      url: "https://images.unsplash.com/photo-1663527793091-1ce93948a174?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Indian Wedding Attire",
      caption: "Festive Splendor",
    },
    {
      url: "https://images.unsplash.com/photo-1598899044014-895e928db374?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Ethnic Fusion Wear",
      caption: "Modern Heritage",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev + 1) % images.length)
      }
    }, 4000)

    return () => clearInterval(timer)
  }, [images.length, isHovered])

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/6 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-dharika-pink rounded-full animate-float-gentle"></div>
          <div className="absolute top-1/2 right-1/4 w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-dharika-lavender rounded-full animate-float-slow"></div>
          <div className="absolute bottom-1/3 left-1/4 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-dharika-sage rounded-full animate-float-medium"></div>
          <div className="absolute bottom-1/4 right-1/6 w-7 h-7 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-dharika-yellow rounded-full animate-float-fast"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12 animate-vision-header">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-dharika-text mb-4 transform transition-all duration-700 hover:scale-105">
            Our Vision
          </h2>
          <p className="text-base sm:text-lg text-dharika-text-light max-w-xs sm:max-w-2xl mx-auto leading-relaxed transform transition-all duration-500 hover:text-dharika-text px-4 sm:px-0">
            Celebrating the rich tapestry of Indian fashion while embracing contemporary design sensibilities
          </p>
        </div>

        <div
          className="relative max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main carousel container with enhanced hover effects */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl bg-dharika-card transition-all duration-700 hover:shadow-3xl hover:scale-[1.02] group">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 group-hover:from-black/40"></div>
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-white transform transition-all duration-500 group-hover:translate-y-[-8px]">
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold mb-1 sm:mb-2 animate-slide-up">
                    {image.caption}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base opacity-90 animate-slide-up-delayed">{image.alt}</p>
                </div>
              </div>
            ))}

            {/* Hover overlay with animated elements */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 bg-dharika-gold rounded-full animate-pulse"></div>
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-dharika-pink rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Enhanced dots indicator */}
          <div className="flex justify-center mt-4 sm:mt-8 space-x-2 sm:space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-500 hover:scale-150 active:scale-75 ${
                  index === currentSlide
                    ? "bg-dharika-gold scale-125 animate-pulse-soft"
                    : "bg-dharika-text-light hover:bg-dharika-gold/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Side thumbnails - hidden on mobile, visible on larger screens */}
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-20 xl:-left-24 flex-col space-y-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-12 h-12 xl:w-16 xl:h-16 rounded-lg overflow-hidden transition-all duration-500 hover:scale-110 hover:rotate-2 active:scale-95 ${
                  index === currentSlide
                    ? "ring-2 ring-dharika-gold scale-105 animate-pulse-soft"
                    : "opacity-60 hover:opacity-100 hover:shadow-lg"
                }`}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </button>
            ))}
          </div>

          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-20 xl:-right-24 flex-col space-y-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide((index + 2) % images.length)}
                className={`w-12 h-12 xl:w-16 xl:h-16 rounded-lg overflow-hidden transition-all duration-500 hover:scale-110 hover:-rotate-2 active:scale-95 ${
                  (index + 2) % images.length === currentSlide
                    ? "ring-2 ring-dharika-gold scale-105 animate-pulse-soft"
                    : "opacity-60 hover:opacity-100 hover:shadow-lg"
                }`}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageCarousel
