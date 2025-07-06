import { Mail } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dharika-text text-white py-12 sm:py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-dharika-gold rounded-full animate-float-gentle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 sm:w-20 sm:h-20 bg-dharika-pink rounded-full animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/6 w-8 h-8 sm:w-14 sm:h-14 bg-dharika-lavender rounded-full animate-float-medium"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-fade-in-up">
          {/* Brand */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-3xl sm:text-4xl font-serif font-bold mb-3 sm:mb-4 hover:text-dharika-gold transition-colors duration-500 cursor-default">
              Dharika
            </h3>
            <p className="text-base sm:text-lg opacity-80 max-w-xs sm:max-w-md mx-auto hover:opacity-100 transition-opacity duration-300">
              Redefining Indian ethnic fashion for the modern generation
            </p>
          </div>

          {/* Contact */}
          <div className="mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-center gap-2 text-dharika-gold mb-3 sm:mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              <span className="text-sm sm:text-base">hello@dharika.fashion</span>
            </div>
            <p className="text-xs sm:text-sm opacity-70 hover:opacity-90 transition-opacity duration-300 px-4 sm:px-0">
              For collaborations, press inquiries, or just to say hello
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 sm:w-24 h-0.5 bg-dharika-gold mx-auto mb-6 sm:mb-8 animate-expand-line hover:w-32 sm:hover:w-40 transition-all duration-700"></div>

          {/* Bottom */}
          <div className="text-xs sm:text-sm opacity-70 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="mb-2 hover:opacity-90 transition-opacity duration-300">
              © {currentYear} Dharika Fashion. All rights reserved.
            </p>
            <p className="hover:text-dharika-gold transition-colors duration-300 cursor-default">
              Crafted with <span className="text-red-400 animate-pulse">❤️</span> for the modern Indian wardrobe
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
