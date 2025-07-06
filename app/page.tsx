"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/Hero"
import ImageCarousel from "@/components/ImageCarousel"
import EmailCapture from "@/components/EmailCapture"
import Footer from "@/components/Footer"
import RunnerGame from "@/components/RunnerGame"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [showGame, setShowGame] = useState(false)

  useEffect(() => {
    // Page load animation sequence
    const timer1 = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    const timer2 = setTimeout(() => {
      setShowContent(true)
    }, 300)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const toggleGame = () => {
    setShowGame(!showGame)
  }

  if (showGame) {
    return <RunnerGame onBack={toggleGame} />
  }

  return (
    <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      {/* Page loader overlay */}
      <div
        className={`fixed inset-0 bg-dharika-gradient z-50 transition-all duration-1000 ${
          showContent ? "opacity-0 pointer-events-none translate-y-[-100%]" : "opacity-100"
        }`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-dharika-text mb-4 animate-pulse-soft">
              Dharika
            </h1>
            <div className="w-16 h-1 bg-dharika-gold mx-auto rounded-full animate-expand-line"></div>
          </div>
        </div>
      </div>

      {/* Main content with enhanced animations */}
      <div
        className={`transition-all duration-1000 delay-300 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Game Toggle Button - Fixed Position */}
        <button
          onClick={toggleGame}
          className="fixed top-4 right-4 z-50 bg-dharika-gold text-white px-3 py-2 md:px-4 md:py-2 rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 hover:scale-110 shadow-lg text-sm md:text-base animate-pulse-soft"
        >
          🏃‍♀️ <span className="hidden sm:inline">Play Runway Runner</span>
          <span className="sm:hidden">Game</span>
        </button>

        {/* Hero Section */}
        <section className="relative z-30">
          <Hero />
        </section>

        {/* Vision Section */}
        <section className="relative z-20 animate-fade-in-up">
          <ImageCarousel />
        </section>

        {/* Email Capture Section */}
        <section className="relative z-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <EmailCapture />
        </section>

        {/* Footer Section */}
        <section className="relative z-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Footer />
        </section>
      </div>
    </div>
  )
}
