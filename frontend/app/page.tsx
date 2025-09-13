"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Scale, Shield, Users, Zap, Github, Mail } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Enhanced Background Effects with Mouse Interaction */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,145,178,0.1),transparent_50%)]" />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(8,145,178,0.06), transparent 40%)`,
        }}
      />

      {/* Navigation with slide-in animation */}
      <nav
        className={`relative z-10 p-6 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <Scale className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-2xl font-bold font-[family-name:var(--font-playfair)]">LawMate</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-muted-foreground hover:text-white transition-all duration-300 hover:scale-105"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-muted-foreground hover:text-white transition-all duration-300 hover:scale-105"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-white transition-all duration-300 hover:scale-105"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with staggered animations */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-6xl md:text-7xl font-bold font-[family-name:var(--font-playfair)] mb-6 text-balance transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            Your AI Legal
            <span className="text-primary block animate-pulse">Companion</span>
          </h1>
          <p
            className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            Get instant, accurate answers about Indian law from our AI-powered legal assistant. Trusted by legal
            professionals and citizens alike.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Link href="/chat">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 glass border-white/20 hover:bg-white/10 bg-transparent transform hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section with scroll animations */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 font-[family-name:var(--font-playfair)] animate-fade-in-up">
            Why Choose LawMate?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-card p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
              <Shield className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:rotate-12" />
              <h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-playfair)]">
                Accurate Legal Information
              </h3>
              <p className="text-muted-foreground">
                Get precise answers based on current Indian legal statutes and case law.
              </p>
            </Card>

            <Card className="glass-card p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
              <Zap className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:rotate-12" />
              <h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-playfair)]">Instant Responses</h3>
              <p className="text-muted-foreground">
                No more waiting for appointments. Get immediate legal guidance 24/7.
              </p>
            </Card>

            <Card className="glass-card p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
              <Users className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:rotate-12" />
              <h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-playfair)]">For Everyone</h3>
              <p className="text-muted-foreground">
                Whether you're a lawyer or citizen, get legal help in simple language.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 font-[family-name:var(--font-playfair)]">About LawMate</h2>
          <Card className="glass-card p-8 text-left">
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              LawMate is an advanced AI-powered legal assistant specifically designed to help users navigate the
              complexities of Indian law. Our platform combines cutting-edge artificial intelligence with comprehensive
              legal knowledge to provide accurate, accessible legal information to everyone.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Whether you're a legal professional seeking quick references, a student learning about Indian
              jurisprudence, or a citizen trying to understand your rights and obligations, LawMate is here to help you
              make informed decisions.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <span>Created by</span>
              <a
                href="https://github.com/Vitiantanmay"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors duration-300"
              >
                <Github className="h-4 w-4" />
                <span>Tanmay</span>
              </a>
            </div>
          </Card>
        </div>
      </section>

      <section id="contact" className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 font-[family-name:var(--font-playfair)]">Get in Touch</h2>
          <Card className="glass-card p-8">
            <p className="text-lg text-muted-foreground mb-8">
              Have questions, suggestions, or need support? We'd love to hear from you.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="mailto:contact@lawmate.ai"
                className="flex items-center justify-center space-x-3 p-4 glass border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="h-5 w-5 text-primary" />
                <span>tanmaygalav@gmail.com</span>
              </a>
              <a
                href="https://github.com/Vitiantanmay"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 p-4 glass border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <Github className="h-5 w-5 text-primary" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section with enhanced animations */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-card p-12 transform hover:scale-105 transition-all duration-500">
            <h2 className="text-4xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
              Ready to Get Legal Help?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands who trust LawMate for their legal questions.
            </p>
            <Link href="/chat">
              <Button
                size="lg"
                className="text-lg px-12 py-6 bg-primary hover:bg-primary/90 transform hover:scale-110 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              >
                Start Chatting Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0 group">
              <Scale className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-xl font-bold font-[family-name:var(--font-playfair)]">LawMate</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-white transition-all duration-300 hover:scale-105">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-all duration-300 hover:scale-105">
                Terms of Service
              </a>
              <a href="#contact" className="hover:text-white transition-all duration-300 hover:scale-105">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-muted-foreground">
            <p>© 2024 LawMate. All rights reserved. Not a substitute for professional legal advice.</p>
            <p className="mt-2 flex items-center justify-center space-x-2">
              <span>Created with ❤️ by</span>
              <a
                href="https://github.com/Vitiantanmay"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors duration-300"
              >
                <Github className="h-4 w-4" />
                <span>Tanmay</span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
