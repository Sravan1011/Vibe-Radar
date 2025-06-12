"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, User, Bot, Loader2, X, Maximize2 } from "lucide-react"
import type { Chat, Message, LLMResponse } from "../types/chat"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"

interface ChatInterfaceProps {
  chat: Chat | null
  onUpdateChat: (chat: Chat) => void
}

export function ChatInterface({ chat, onUpdateChat }: ChatInterfaceProps) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [chat?.messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !chat || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    // Update chat with user message
    const updatedChat = {
      ...chat,
      messages: [...chat.messages, userMessage],
      updatedAt: new Date(),
      title: chat.messages.length === 0 ? input.trim().slice(0, 50) : chat.title,
    }
    onUpdateChat(updatedChat)
    setInput("")
    setIsLoading(true)

    try {
      // Simulate API calls to multiple LLMs
      const llmResponses = await Promise.all([
        simulateLLMResponse("GPT-4", input),
        simulateLLMResponse("Claude", input),
        simulateLLMResponse("Gemini", input),
        simulateLLMResponse("Llama", input),
      ])

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Here are the responses from different AI models:",
        role: "assistant",
        timestamp: new Date(),
        llmResponses,
      }

      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, assistantMessage],
        updatedAt: new Date(),
      }
      onUpdateChat(finalChat)
    } catch (error) {
      console.error("Error getting LLM responses:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No chat selected</h3>
          <p className="text-muted-foreground">Select a chat from the sidebar or create a new one</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b p-4">
        <h2 className="font-semibold text-lg">{chat.title}</h2>
        <p className="text-sm text-muted-foreground">
          {chat.messages.length} messages • Last updated {chat.updatedAt.toLocaleTimeString()}
        </p>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6 max-w-4xl mx-auto">
          {chat.messages.map((message) => (
            <div key={message.id} className="space-y-4">
              <div className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn("flex gap-3 max-w-[80%]", message.role === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "rounded-lg p-3",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>

              {message.llmResponses && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {message.llmResponses.map((response, index) => (
                    <LLMResponseCard key={index} response={response} />
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Getting responses from AI models...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question to compare AI opinions..."
              className="min-h-[60px] resize-none"
              disabled={isLoading}
            />
            <Button type="submit" disabled={!input.trim() || isLoading} className="px-3">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
        </form>
      </div>
    </div>
  )
}

function LLMResponseCard({ response }: { response: LLMResponse }) {
  const [open, setOpen] = useState(false)
  const getModelColor = (model: string) => {
    switch (model) {
      case "GPT-4":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Claude":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Gemini":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Llama":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <>
      <Card className="h-full relative">
        <CardHeader className="pb-3 flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-sm font-medium">{response.model}</CardTitle>
            <Badge variant="secondary" className={getModelColor(response.model)}>
              {response.confidence}% confidence
            </Badge>
          </div>
          <button
            className="ml-auto p-1 rounded hover:bg-muted transition absolute top-2 right-2"
            onClick={() => setOpen(true)}
            aria-label="Expand response"
            type="button"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-6">{response.response}</p>
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>{response.model} Response</DialogTitle>
            <DialogClose asChild>
              <button className="p-1 rounded hover:bg-muted" aria-label="Close expanded response">
                <X className="h-5 w-5" />
              </button>
            </DialogClose>
          </DialogHeader>
          <div className="mt-2 whitespace-pre-line text-base text-foreground">
            {response.response}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Simulate LLM API responses
async function simulateLLMResponse(model: string, prompt: string): Promise<LLMResponse> {
  if (model === "Gemini") {
    try {
      const res = await fetch("/api/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error("Gemini API error");
      const data = await res.json();
      return {
        model: "Gemini",
        response: data.reply || "No response from Gemini.",
        confidence: 90, // You can adjust or randomize as needed
      };
    } catch (error) {
      return {
        model: "Gemini",
        response: "Error fetching Gemini response.",
        confidence: 0,
      };
    }
  }
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

  const responses = {
    "GPT-4": {
      "climate change":
        "Climate change requires immediate action through renewable energy transition, carbon pricing, and international cooperation. Key solutions include solar and wind deployment, electric vehicle adoption, and nature-based solutions.",
      "ai ethics":
        "AI ethics encompasses fairness, transparency, accountability, and privacy. We need robust governance frameworks, diverse development teams, and continuous monitoring of AI systems for bias and harmful outcomes.",
      default:
        "This is a complex topic that requires careful analysis of multiple perspectives, evidence-based reasoning, and consideration of various stakeholder interests.",
    },
    Claude: {
      "climate change":
        "Addressing climate change demands systemic transformation across energy, transportation, and industrial sectors. Effective strategies include carbon capture, sustainable agriculture, and climate adaptation measures.",
      "ai ethics":
        "Ethical AI development requires transparency in decision-making processes, fairness across different populations, and robust safety measures. Human oversight and explainable AI are crucial components.",
      default:
        "I approach this question by considering multiple viewpoints and available evidence. The topic involves nuanced considerations that benefit from interdisciplinary analysis.",
    },
    Llama: {
      "climate change":
        "Climate action requires deployment of clean energy, sustainable land use, carbon sequestration, and green infrastructure. Economic incentives and international agreements can accelerate progress.",
      "ai ethics":
        "Key ethical principles for AI include transparency, fairness, accountability, and respect for human rights. Diverse teams and inclusive design processes help address potential biases.",
      default:
        "This topic involves multiple dimensions that benefit from comprehensive analysis, considering various perspectives and available research evidence.",
    },
  }

  const modelResponses = responses[model as keyof typeof responses]
  const promptLower = prompt.toLowerCase()

  let response = modelResponses.default
  if (promptLower.includes("climate")) response = modelResponses["climate change"]
  else if (promptLower.includes("ai") || promptLower.includes("ethics")) response = modelResponses["ai ethics"]

  return {
    model,
    response,
    confidence: Math.floor(Math.random() * 20) + 80, // 80-99% confidence
  }
}
