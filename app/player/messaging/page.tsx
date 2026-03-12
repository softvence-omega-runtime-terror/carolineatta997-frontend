"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Send, Paperclip } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const conversations = [
  {
    id: 1,
    name: "FC Barcelona Youth",
    avatar: "/images/clubs/barcelona.png",
    role: "club",
    message: "We are interested...",
    time: "2h ago",
    unread: 2,
    active: true,
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=68",
    role: "player",
    message: "Thank you...",
    time: "5h ago",
    unread: 0,
    active: false,
  },
  {
    id: 3,
    name: "Roberto Martinez",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "scout",
    message: "Great scouting...",
    time: "1d ago",
    unread: 1,
    active: false,
  },
  {
    id: 4,
    name: "Chelsea FC Academy",
    avatar: "/images/clubs/chelsea.png",
    role: "club",
    message: "Looking forward...",
    time: "1d ago",
    unread: 0,
    active: false,
  },
  {
    id: 5,
    name: "Marcus Johnson",
    avatar: "https://i.pravatar.cc/150?img=44",
    role: "player",
    message: "Here are my videos",
    time: "2d ago",
    unread: 0,
    active: false,
  },
  {
    id: 6,
    name: "Ajax Amsterdam Scouts",
    avatar: "/images/clubs/ajax.png",
    role: "club",
    message: "Your profile matches...",
    time: "3d ago",
    unread: 3,
    active: true,
  },
  {
    id: 7,
    name: "Elena Vargas",
    avatar: "https://i.pravatar.cc/150?img=33",
    role: "scout",
    message: "Interested in...",
    time: "4d ago",
    unread: 0,
    active: false,
  },
  {
    id: 8,
    name: "Manchester United Youth",
    avatar: "/images/clubs/manutd.png",
    role: "club",
    message: "We'd like to invite...",
    time: "1w ago",
    unread: 1,
    active: false,
  },
  {
    id: 9,
    name: "Sophie Laurent",
    avatar: "https://i.pravatar.cc/150?img=22",
    role: "player",
    message: "Hey, saw your post!",
    time: "1w ago",
    unread: 0,
    active: true,
  },
];

const conversationMessages: Record<number, any[]> = {
  1: [
    { id: 1, sender: "FC Barcelona Youth", content: "Hi Michael!", time: "10:15 AM", isOwn: false },
    { id: 2, sender: "You", content: "Hello! How are you?", time: "10:17 AM", isOwn: true },
    { id: 3, sender: "FC Barcelona Youth", content: "Good, thanks! 😊", time: "10:18 AM", isOwn: false },
  ],
  2: [
    { id: 1, sender: "Carlos Rodriguez", content: "Hey there!", time: "09:40 AM", isOwn: false },
    { id: 2, sender: "You", content: "Hi Carlos!", time: "09:42 AM", isOwn: true },
  ],
  3: [
    { id: 1, sender: "Roberto Martinez", content: "Hello", time: "Yesterday 3:12 PM", isOwn: false },
    { id: 2, sender: "You", content: "Hi Roberto", time: "3:14 PM", isOwn: true },
  ],
  4: [
    { id: 1, sender: "Chelsea FC Academy", content: "Hi!", time: "2d ago", isOwn: false },
    { id: 2, sender: "You", content: "Hello team!", time: "2d ago", isOwn: true },
  ],
  5: [
    { id: 1, sender: "Marcus Johnson", content: "Hey man", time: "3d ago", isOwn: false },
    { id: 2, sender: "You", content: "Yo Marcus!", time: "3d ago", isOwn: true },
  ],
  6: [
    { id: 1, sender: "Ajax Amsterdam Scouts", content: "Hi", time: "4d ago", isOwn: false },
    { id: 2, sender: "You", content: "Hello Ajax team", time: "4d ago", isOwn: true },
  ],
  7: [
    { id: 1, sender: "Elena Vargas", content: "Hello 👋", time: "5d ago", isOwn: false },
    { id: 2, sender: "You", content: "Hi Elena!", time: "5d ago", isOwn: true },
  ],
  8: [
    { id: 1, sender: "Manchester United Youth", content: "Hey!", time: "1w ago", isOwn: false },
    { id: 2, sender: "You", content: "Hello United!", time: "1w ago", isOwn: true },
  ],
  9: [
    { id: 1, sender: "Sophie Laurent", content: "Hi there!", time: "1w ago", isOwn: false },
    { id: 2, sender: "You", content: "Hey Sophie 😄", time: "1w ago", isOwn: true },
  ],
};
const MessagingPage = () => {
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState(conversationMessages[1] || []);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConvs = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setMessages(conversationMessages[selectedConv.id] || []);
    setInputValue("");
  }, [selectedConv.id]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: "You",
      content: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
        <h1 className="text-4xl font-bold mb-6 inline-block pb-2 bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
          Messaging
        </h1>
      <div className="min-h-screen bg-[#1A2049] text-white flex flex-col">
      {/* Top Header - Messaging */}
      {/* <div className="p-4 border-b border-[#2A3560]/60 bg-[#1A2049]">
      
      </div> */}

      {/* Main Content - flex row */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Chat List (scrollable) */}
        <div className="hidden md:flex md:w-80 lg:w-96 flex-col border-r border-[#2A3560]/70 bg-[#1A2049]">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#00E5FF]/60" />
              <Input
                placeholder="Search messages..."
                className="pl-10 bg-[#242E5A] border-[#2A3560] text-white placeholder:text-gray-400 focus:border-[#00E5FF]/60 rounded-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Chat list - scrollable */}
          <div className="flex-1 overflow-y-auto">
            {filteredConvs.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className={cn(
                  "flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors border-b border-[#2A3560]/30 last:border-b-0",
                  selectedConv.id === conv.id ? "bg-[#242E5A]" : "hover:bg-[#242E5A]/60"
                )}
              >
                <div className="relative shrink-0">
                  <Avatar className="h-12 w-12 ring-1 ring-[#00E5FF]/20">
                    <AvatarImage src={conv.avatar} alt={conv.name} />
                    <AvatarFallback className="bg-[#9C27B0]/40 text-white">
                      {conv.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {conv.active && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-[#1A2049] shadow-[0_0_8px_#00ff9f]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold truncate">{conv.name}</p>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-300 truncate mt-0.5">{conv.message}</p>
                </div>

                {conv.unread > 0 && (
                  <Badge className="bg-[#9C27B0] hover:bg-[#9C27B0]/90 text-white text-xs px-2 py-0.5">
                    {conv.unread}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Chat Area - Messenger Desktop Style */}
        <div className="flex-1 flex flex-col bg-[#1A2049] overflow-hidden">
          {selectedConv ? (
            <>
              {/* Sticky Header */}
              <div className="sticky top-0 z-10 p-4 border-b border-[#2A3560]/70 flex items-center gap-3 bg-[#1A2049]/95 backdrop-blur-md">
                <Avatar className="h-10 w-10 ring-1 ring-[#00E5FF]/30">
                  <AvatarImage src={selectedConv.avatar} />
                  <AvatarFallback className="bg-[#9C27B0]/50">{selectedConv.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-lg">{selectedConv.name}</h2>
                  <p className="text-sm text-[#00E5FF]/80 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    Active now
                  </p>
                </div>
              </div>

              {/* Messages - only this scrolls */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-[#9C27B0]/60 scrollbar-track-[#1A2049]">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex", msg.isOwn ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[80%] px-5 py-3 rounded-2xl shadow-md",
                        msg.isOwn
                          ? "bg-[#9C27B0] text-white rounded-br-none"
                          : "bg-[#00E5FF] text-[#1A2049] rounded-bl-none"
                      )}
                    >
                      <p className="text-[15px] leading-relaxed">{msg.content}</p>
                      <p className="text-xs mt-2 opacity-80 text-right">{msg.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Sticky Input Bar */}
              <div className="sticky bottom-0 z-10 p-4 border-t border-[#2A3560]/70 bg-[#1A2049]/95 backdrop-blur-md">
                <div className="flex items-center gap-3 max-w-5xl mx-auto">
                  <button className="p-3 rounded-xl hover:bg-[#00E5FF]/10 transition-colors shrink-0">
                    <Paperclip className="h-5 w-5 text-[#00E5FF]/80" />
                  </button>

                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 bg-[#242E5A] border-[#2A3560] text-white placeholder:text-gray-400 focus:border-[#00E5FF]/70 rounded-xl"
                  />

                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="p-3.5 bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] rounded-xl text-white hover:opacity-90 transition-all shadow-lg shadow-[#9C27B0]/30 disabled:opacity-50 shrink-0"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#00E5FF]/70">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MessagingPage;