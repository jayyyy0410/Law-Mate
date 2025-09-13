"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Scale, Github, Mail, Users, Target, Award } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,145,178,0.1),transparent_50%)]" />

      {/* Navigation */}
      <nav
        className={`relative z-10 p-6 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2 group">
              <Scale className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-2xl font-bold font-[family-name:var(--font-playfair)]">LawMate</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-5xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] mb-6 text-balance transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            About <span className="text-primary">LawMate</span>
          </h1>
          <p
            className={`text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            Democratizing legal knowledge through AI-powered assistance for Indian law
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 delay-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <h2 className="text-4xl font-bold mb-6 font-[family-name:var(--font-playfair)]">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                LawMate was created to bridge the gap between complex legal information and everyday understanding. We
                believe that legal knowledge should be accessible to everyone, regardless of their background or
                expertise.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our AI-powered platform specializes in Indian law, providing accurate, reliable, and easy-to-understand
                legal information to help users make informed decisions about their legal matters.
              </p>
            </div>
            <Card
              className={`glass-enhanced p-8 transition-all duration-1000 delay-900 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-playfair)]">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become India's most trusted AI legal assistant, empowering citizens and legal professionals with
                instant access to accurate legal information and guidance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 font-[family-name:var(--font-playfair)]">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
              <Users className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:rotate-12" />
              <h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-playfair)]">
                User-Centric Design
              </h3>
              <p className="text-muted-foreground">
                Built with both legal professionals and everyday citizens in mind, ensuring accessibility for all users.
              </p>
            </Card>

            <Card className="glass-card p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
              <Award className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:rotate-12" />
              <h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-playfair)]">
                Specialized Knowledge
              </h3>
              <p className="text-muted-foreground">
                Focused exclusively on Indian law, ensuring deep understanding and accurate responses.
              </p>
            </Card>

            <Card className="glass-card p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
              <Scale className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:rotate-12" />
              <h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-playfair)]">Ethical AI</h3>
              <p className="text-muted-foreground">
                Committed to responsible AI practices, transparency, and ethical use of legal information.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 font-[family-name:var(--font-playfair)]">Meet the Creator</h2>
          <Card className="glass-enhanced p-12">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mb-6">
                <Github className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-playfair)]">Tanmay</h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                A passionate developer dedicated to making legal information accessible through innovative technology.
                With a vision to democratize legal knowledge, Vitiantanmay created LawMate to bridge the gap between
                complex legal concepts and everyday understanding.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/Vitiantanmay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-6 py-3 glass-button rounded-lg hover:scale-105 transition-all duration-300"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub Profile</span>
                </a>
                <a
                  href="tanmaygalav@gmail.com"
                  className="flex items-center space-x-2 px-6 py-3 glass-button rounded-lg hover:scale-105 transition-all duration-300"
                >
                  <Mail className="h-5 w-5" />
                  <span>Get in Touch</span>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-card p-12 transform hover:scale-105 transition-all duration-500">
            <h2 className="text-4xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
              Ready to Experience LawMate?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the future of legal assistance and get instant answers to your legal questions.
            </p>
            <Link href="/chat">
              <Button
                size="lg"
                className="text-lg px-12 py-6 bg-primary hover:bg-primary/90 transform hover:scale-110 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              >
                Start Chatting Now
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  )
}
