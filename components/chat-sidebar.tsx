"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MessageSquare, Plus, Search, MoreHorizontal, Trash2, Edit2, Radar } from "lucide-react"
import type { Chat } from "../types/chat"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
  chats: Chat[]
  activeChat: Chat | null
  onSelectChat: (chat: Chat) => void
  onNewChat: () => void
  onDeleteChat: (chatId: string) => void
}

export function ChatSidebar({ chats, activeChat, onSelectChat, onNewChat, onDeleteChat }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = chats.filter((chat) => chat.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <Sidebar className="w-80 border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Radar className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">LLM Vibes</span>
        </div>
        <Button onClick={onNewChat} className="w-full justify-start gap-2">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          <SidebarMenu className="p-2">
            {filteredChats.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <div className="group relative">
                  <SidebarMenuButton
                    onClick={() => onSelectChat(chat)}
                    isActive={activeChat?.id === chat.id}
                    className={cn(
                      "w-full justify-start text-left h-auto p-3 hover:bg-accent/50",
                      activeChat?.id === chat.id && "bg-accent",
                    )}
                  >
                    <div className="flex items-start gap-3 w-full min-w-0">
                      <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{chat.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatDate(chat.updatedAt)} • {chat.messages.length} messages
                        </div>
                      </div>
                    </div>
                  </SidebarMenuButton>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDeleteChat(chat.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="text-xs text-muted-foreground text-center">LLM Vibes Radar v1.0</div>
      </SidebarFooter>
    </Sidebar>
  )
}
