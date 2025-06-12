"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatInterface } from "@/components/chat-interface"
import type { Chat } from "@/types/chat"

export default function OpinionPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<Chat | null>(null)

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
    }
    setChats([newChat, ...chats])
    setActiveChat(newChat)
  }

  const updateChat = (updatedChat: Chat) => {
    setChats(chats.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat)))
    if (activeChat?.id === updatedChat.id) {
      setActiveChat(updatedChat)
    }
  }

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter((chat) => chat.id !== chatId)
    setChats(updatedChats)
    if (activeChat?.id === chatId) {
      setActiveChat(updatedChats[0] || null)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <SidebarProvider defaultOpen={true}>
        <ChatSidebar
          chats={chats}
          activeChat={activeChat}
          onSelectChat={setActiveChat}
          onNewChat={createNewChat}
          onDeleteChat={deleteChat}
        />
        <main className="flex-1 flex flex-col">
          {activeChat ? (
            <ChatInterface chat={activeChat} onUpdateChat={updateChat} />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold mb-2">No chat selected</h2>
              <p className="text-muted-foreground mb-4">Start a new conversation to get AI opinions!</p>
              <button
                className="bg-primary text-primary-foreground px-4 py-2 rounded shadow hover:bg-primary/90 transition"
                onClick={createNewChat}
              >
                New Chat
              </button>
            </div>
          )}
        </main>
      </SidebarProvider>
    </div>
  )
}
