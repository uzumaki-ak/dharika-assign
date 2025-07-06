"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Check, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const EmailCapture = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Please enter your email address",
        description: "We need your email to keep you updated on our launch!",
        variant: "destructive",
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Please enter a valid email address",
        description: "Make sure your email is in the correct format.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
      toast({
        title: "Welcome to the Dharika family! ✨",
        description: "You'll be the first to know when we launch. Get ready for something beautiful!",
      })
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <section id="email-capture" className="py-20 bg-dharika-gradient relative pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto animate-scale-in">
            <div className="bg-dharika-card rounded-3xl p-12 shadow-2xl">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-dharika-text mb-4">{"You're In! 🎉"}</h2>
              <p className="text-lg text-dharika-text-light mb-6">
                Thank you for joining our journey. {"We'll"} keep you updated with exclusive previews, behind-the-scenes
                content, and early access to our collections.
              </p>
              <div className="flex items-center justify-center space-x-2 text-dharika-gold">
                <Mail className="w-5 h-5" />
                <span className="font-medium">{email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="email-capture" className="py-12 sm:py-16 lg:py-20 bg-dharika-gradient relative pattern-overlay">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xs sm:max-w-2xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-dharika-text mb-4 sm:mb-6 hover:scale-105 transition-transform duration-500">
              Join Our Story
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-dharika-text-light mb-6 sm:mb-8 leading-relaxed hover:text-dharika-text transition-colors duration-300 px-4 sm:px-0">
              Be among the first to experience Dharika. Get exclusive access to our launch, special offers, and
              behind-the-scenes glimpses of our design process.
            </p>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <form
              onSubmit={handleSubmit}
              className="email-form-hover bg-dharika-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-500"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-dharika-text-light w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-dharika-sage/30 rounded-lg sm:rounded-xl focus:border-dharika-gold focus:outline-none transition-all duration-300 text-base sm:text-lg bg-white/70 backdrop-blur-sm hover:bg-white/80 focus:bg-white/90"
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-dharika-text text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium text-base sm:text-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center justify-center gap-2 sm:gap-3 group disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px] sm:min-w-[160px] active:scale-95"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Notify Me</span>
                      <span className="sm:hidden">Join</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-dharika-text-light mt-3 sm:mt-4 opacity-80">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 sm:mt-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 text-dharika-text-light">
              <div className="flex items-center gap-2 hover:text-dharika-text transition-colors duration-300">
                <div className="w-2 h-2 bg-dharika-gold rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm">No spam, ever</span>
              </div>
              <div className="flex items-center gap-2 hover:text-dharika-text transition-colors duration-300">
                <div
                  className="w-2 h-2 bg-dharika-gold rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <span className="text-xs sm:text-sm">Exclusive updates only</span>
              </div>
              <div className="flex items-center gap-2 hover:text-dharika-text transition-colors duration-300">
                <div
                  className="w-2 h-2 bg-dharika-gold rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <span className="text-xs sm:text-sm">Early access perks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailCapture
