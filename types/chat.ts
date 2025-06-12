export interface LLMResponse {
    model: string
    response: string
    confidence: number
  }
  
  export interface Message {
    id: string
    content: string
    role: "user" | "assistant"
    timestamp: Date
    llmResponses?: LLMResponse[]
  }
  
  export interface Chat {
    id: string
    title: string
    createdAt: Date
    updatedAt: Date
    messages: Message[]
  }
  