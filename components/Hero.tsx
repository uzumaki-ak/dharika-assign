"use client"
import { Mail } from "lucide-react"

const Hero = () => {
  const scrollToEmailForm = () => {
    const emailSection = document.getElementById("email-capture")
    emailSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen bg-dharika-gradient relative pattern-overlay flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-dharika-pink rounded-full animate-float-slow opacity-40 hover:opacity-60 transition-opacity duration-500"></div>
        <div className="absolute top-3/4 right-1/4 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 bg-dharika-lavender rounded-full animate-float-medium opacity-50 hover:opacity-70 transition-opacity duration-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-dharika-sage rounded-full animate-float-fast opacity-60 hover:opacity-80 transition-opacity duration-500"></div>
        <div className="absolute top-1/2 right-1/6 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-dharika-yellow rounded-full animate-bounce-gentle opacity-40 hover:opacity-60 transition-opacity duration-500"></div>
      </div>

      <div className="container mx-auto text-center z-10 relative max-w-4xl">
        {/* Logo/Brand Name with enhanced animation */}
        <div className="animate-hero-title">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-dharika-text mb-4 tracking-wide transform hover:scale-105 transition-transform duration-500">
            Dharika
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-dharika-gold mx-auto mb-6 sm:mb-8 rounded-full animate-expand-line hover:w-32 transition-all duration-700"></div>
        </div>

        {/* Tagline with staggered animation */}
        <div className="animate-hero-subtitle">
          <p className="text-lg sm:text-xl md:text-2xl text-dharika-text-light mb-3 sm:mb-4 font-light transform hover:text-dharika-text transition-colors duration-300">
            Where Tradition Meets Tomorrow
          </p>
          <p className="text-base sm:text-lg md:text-xl text-dharika-text-light mb-8 sm:mb-12 max-w-xs sm:max-w-2xl mx-auto leading-relaxed transform hover:text-dharika-text transition-colors duration-300 px-4 sm:px-0">
            A Gen Z–founded, community-led Indian ethnic fashion brand redefining traditional style for the modern
            world.
          </p>
        </div>

        {/* Call to Action with enhanced hover effects */}
        <div className="animate-hero-cta">
          <button
            onClick={scrollToEmailForm}
            className="bg-dharika-text text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg hover:bg-opacity-90 transition-all duration-500 hover:scale-110 hover:shadow-2xl inline-flex items-center gap-2 sm:gap-3 group transform hover:-translate-y-1 active:scale-95"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse transition-transform duration-300 group-hover:rotate-12" />
            <span className="hidden sm:inline">Join Our Journey</span>
            <span className="sm:hidden">Join Us</span>
            <div className="w-0 group-hover:w-4 sm:group-hover:w-6 transition-all duration-500 overflow-hidden">
              <div className="w-4 sm:w-6 h-0.5 bg-white rounded-full animate-pulse"></div>
            </div>
          </button>
        </div>

        {/* Enhanced floating elements with different animations - responsive positioning */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-dharika-pink rounded-full opacity-60 animate-float-gentle hover:animate-pulse-soft cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12"></div>
        <div className="absolute top-20 sm:top-40 right-8 sm:right-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-dharika-lavender rounded-full opacity-60 animate-float-slow hover:animate-pulse cursor-pointer transition-all duration-300 hover:scale-125 hover:-rotate-12"></div>
        <div className="absolute bottom-20 sm:bottom-40 left-8 sm:left-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-dharika-sage rounded-full opacity-60 animate-float-medium hover:animate-bounce cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-45"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-14 h-14 sm:w-18 sm:h-18 lg:w-24 lg:h-24 bg-dharika-yellow rounded-full opacity-60 animate-float-fast hover:animate-spin-slow cursor-pointer transition-all duration-300 hover:scale-125"></div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-dharika-text rounded-full flex justify-center hover:border-dharika-gold transition-colors duration-300 cursor-pointer hover:scale-110 active:scale-95">
          <div className="w-1 h-2 sm:h-3 bg-dharika-text rounded-full mt-1 sm:mt-2 animate-pulse hover:bg-dharika-gold transition-colors duration-300"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
