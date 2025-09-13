"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Scale, User, Bot, RotateCcw, Download, BookOpen, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Source {
  page_content: string
  metadata: Record<string, any>
}

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  sources?: Source[]
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "👋 Hello! I'm **LawMate**, your AI legal assistant specializing in Indian law. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setIsVisible(true)
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "",
      role: "assistant",
      timestamp: new Date(),
      sources: [],
    }
    setMessages((prev) => [...prev, assistantMessage])

    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.content }),
      })

      if (!response.body) throw new Error("No response body")

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulatedText = ""
      let sources: Source[] = []

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.replace("data: ", ""))

              if (data.token) {
                accumulatedText += data.token
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessage.id ? { ...msg, content: accumulatedText } : msg
                  )
                )
              }

              if (data.sources) {
                sources = data.sources
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessage.id ? { ...msg, sources } : msg
                  )
                )
              }
            } catch (err) {
              console.error("JSON parse error:", err)
            }
          }
        }
      }
    } catch (err) {
      console.error("Error fetching response:", err)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessage.id
            ? { ...msg, content: "⚠️ Error: Could not fetch reply." }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        content: "👋 Hello! I'm **LawMate**, your AI legal assistant specializing in Indian law. How can I help you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  const exportChat = () => {
    const chatContent = messages
      .map(
        (msg) =>
          `[${msg.timestamp.toLocaleString()}] ${msg.role.toUpperCase()}: ${msg.content}`
      )
      .join("\n\n")

    const blob = new Blob([chatContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lawmate-chat-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-transparent to-blue-700/10 animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.15),transparent_60%)]" />

      {/* HEADER */}
      <header className="relative z-10 p-4 border-b border-white/10 backdrop-blur-md bg-black/40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-white/10 transition"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Scale className="h-6 w-6 text-cyan-400 drop-shadow-glow" />
              <span className="text-xl font-bold tracking-wide text-cyan-300">
                LawMate
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={clearChat} title="Clear Chat">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={exportChat} title="Export Chat">
              <Download className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-400">AI Legal Assistant</span>
          </div>
        </div>
      </header>

      {/* CHAT MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-4xl mx-auto w-full space-y-6">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-[75%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"} items-start space-x-3`}>
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-cyan-500 to-blue-500"
                    : "bg-white/10"
                }`}
              >
                {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              {/* Bubble */}
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed backdrop-blur-md ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-cyan-600/80 to-blue-600/80 text-white"
                    : "bg-white/5 border border-white/10 text-gray-100"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className="text-[0.7rem] opacity-60 mt-2">{message.timestamp.toLocaleTimeString()}</div>

                {/* References Section */}
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-3 text-xs text-gray-300 border-t border-white/10 pt-2">
                    <button
                      className="flex items-center gap-1 hover:text-cyan-400 transition"
                      onClick={() =>
                        setExpandedSources((prev) => ({
                          ...prev,
                          [message.id]: !prev[message.id],
                        }))
                      }
                    >
                      <BookOpen className="h-3 w-3" /> References
                      <ChevronDown
                        className={`h-3 w-3 transition-transform ${
                          expandedSources[message.id] ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedSources[message.id] && (
                      <ul className="mt-2 space-y-1">
                        {message.sources.slice(0, 3).map((src, i) => (
                          <li
                            key={i}
                            className="truncate max-w-[280px] opacity-80"
                            title={src.page_content}
                          >
                            • {src.page_content}
                          </li>
                        ))}
                        {message.sources.length > 3 && (
                          <li className="italic opacity-60">
                            + {message.sources.length - 3} more
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 flex space-x-1">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-150" />
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-300" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT BAR */}
      <div className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-md p-4">
        <div className="max-w-4xl mx-auto flex space-x-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about Indian law..."
            className="flex-1 bg-white/5 border-white/20 text-white rounded-xl focus:border-cyan-400"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          ⚖️ LawMate provides general legal info. Always consult a qualified lawyer for specific advice.
        </p>
      </div>
    </div>
  )
}
