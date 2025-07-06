"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface StackedScrollSectionProps {
  children: React.ReactNode
  index: number
  totalSections: number
  title?: string
  backgroundColor?: string
}

const StackedScrollSection: React.FC<StackedScrollSectionProps> = ({
  children,
  index,
  totalSections,
  title,
  backgroundColor = "bg-white",
}) => {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById(`stacked-section-${index}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [index])

  const calculateTransform = () => {
    const sectionHeight = window.innerHeight
    const sectionStart = index * sectionHeight
    const progress = Math.max(0, Math.min(1, (scrollY - sectionStart) / sectionHeight))

    if (index === 0) return "translateY(0)"

    const scale = 0.95 + progress * 0.05
    const translateY = -20 + progress * 20
    const rotateX = -2 + progress * 2

    return `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`
  }

  const calculateOpacity = () => {
    const sectionHeight = window.innerHeight
    const sectionStart = index * sectionHeight
    const progress = Math.max(0, Math.min(1, (scrollY - sectionStart) / sectionHeight))

    return 0.7 + progress * 0.3
  }

  return (
    <div
      id={`stacked-section-${index}`}
      className={`sticky top-0 min-h-screen ${backgroundColor} transition-all duration-300 ease-out`}
      style={{
        transform: calculateTransform(),
        opacity: calculateOpacity(),
        zIndex: totalSections - index,
        transformOrigin: "center top",
        perspective: "1000px",
      }}
    >
      <div className="relative min-h-screen flex flex-col">
        {title && (
          <div className="absolute top-8 left-8 z-10">
            <h2 className="text-2xl font-serif font-bold text-dharika-text opacity-80">{title}</h2>
          </div>
        )}

        <div
          className={`flex-1 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {children}
        </div>

        {/* Stacking visual indicator */}
        <div className="absolute bottom-4 right-4 flex space-x-1">
          {Array.from({ length: totalSections }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-8 rounded-full transition-all duration-300 ${
                i === index ? "bg-dharika-gold scale-110" : "bg-dharika-text-light opacity-50"
              }`}
              style={{
                transform: `translateY(${i * -2}px)`,
                zIndex: totalSections - i,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default StackedScrollSection
