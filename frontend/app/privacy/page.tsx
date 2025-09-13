"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Scale, Shield, Eye, Lock, FileText } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PrivacyPage() {
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
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p
            className={`text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            Your privacy and data security are our top priorities
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">Data Protection</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              LawMate is committed to protecting your personal information and privacy. We collect only the minimum data
              necessary to provide our AI legal assistance services and never share your personal information with third
              parties without your explicit consent.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              All conversations with our AI assistant are encrypted and stored securely. We use industry-standard
              security measures to protect your data from unauthorized access, disclosure, or misuse.
            </p>
          </Card>

          <Card className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">Information We Collect</h2>
            </div>
            <ul className="text-muted-foreground leading-relaxed space-y-2">
              <li>• Chat messages and queries you send to our AI assistant</li>
              <li>• Basic usage analytics to improve our service</li>
              <li>• Technical information such as IP address and browser type</li>
              <li>• Optional account information if you choose to create an account</li>
            </ul>
          </Card>

          <Card className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">How We Use Your Data</h2>
            </div>
            <ul className="text-muted-foreground leading-relaxed space-y-2">
              <li>• To provide accurate and relevant legal information</li>
              <li>• To improve our AI model and service quality</li>
              <li>• To ensure the security and proper functioning of our platform</li>
              <li>• To communicate important updates about our service</li>
            </ul>
          </Card>

          <Card className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">Your Rights</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the right to access, update, or delete your personal information at any time. You can also
              request a copy of all data we have collected about you or ask us to stop processing your data.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about our privacy practices or wish to exercise your rights, please contact us
              at privacy@lawmate.ai.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}
