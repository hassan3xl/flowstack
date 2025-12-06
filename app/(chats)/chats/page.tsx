"use client";

import React, { useState } from "react";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Search,
  Smile,
  Paperclip,
  Image,
  Mic,
  Users,
  Plus,
  Settings,
  Bell,
  Hash,
  AtSign,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/input/InputField";

interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isOwn?: boolean;
  reactions?: string[];
}

interface GroupChat {
  id: number;
  name: string;
  icon: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  members: number;
  online: number;
}

const groupChats: GroupChat[] = [
  {
    id: 1,
    name: "Dev Team 🚀",
    icon: "💻",
    lastMessage: "Sarah: Just pushed the new feature!",
    timestamp: "2m",
    unread: 3,
    members: 12,
    online: 8,
  },
  {
    id: 2,
    name: "Design Squad",
    icon: "🎨",
    lastMessage: "Mike: Check out these mockups",
    timestamp: "15m",
    unread: 0,
    members: 8,
    online: 5,
  },
  {
    id: 3,
    name: "Weekend Warriors",
    icon: "⚽",
    lastMessage: "Alex: Who's in for Saturday?",
    timestamp: "1h",
    unread: 7,
    members: 15,
    online: 3,
  },
  {
    id: 4,
    name: "Book Club 📚",
    icon: "📖",
    lastMessage: "Emma: Finished chapter 10!",
    timestamp: "2h",
    unread: 0,
    members: 10,
    online: 2,
  },
  {
    id: 5,
    name: "Food Lovers",
    icon: "🍕",
    lastMessage: "David: New restaurant downtown!",
    timestamp: "3h",
    unread: 12,
    members: 20,
    online: 6,
  },
  {
    id: 6,
    name: "Gaming Squad",
    icon: "🎮",
    lastMessage: "Chris: Raid tonight at 8?",
    timestamp: "4h",
    unread: 0,
    members: 18,
    online: 12,
  },
  {
    id: 7,
    name: "Fitness Fam",
    icon: "💪",
    lastMessage: "Lisa: Morning run anyone?",
    timestamp: "5h",
    unread: 2,
    members: 14,
    online: 4,
  },
  {
    id: 8,
    name: "Travel Buddies",
    icon: "✈️",
    lastMessage: "Tom: Barcelona pics uploaded!",
    timestamp: "1d",
    unread: 0,
    members: 11,
    online: 3,
  },
];

const messages: Message[] = [
  {
    id: 1,
    sender: "Sarah Chen",
    avatar: "👩‍💻",
    content:
      "Hey team! Just finished the new authentication module. Ready for review!",
    timestamp: "10:24 AM",
  },
  {
    id: 2,
    sender: "Mike Rodriguez",
    avatar: "👨‍🎨",
    content: "Awesome work Sarah! I'll take a look this afternoon.",
    timestamp: "10:26 AM",
    reactions: ["👍", "🎉"],
  },
  {
    id: 3,
    sender: "Alex Kim",
    avatar: "👨‍💼",
    content:
      "Can someone help me debug this weird issue with the API? Getting a 403 error randomly.",
    timestamp: "10:30 AM",
  },
  {
    id: 4,
    sender: "You",
    avatar: "😊",
    content: "Sure! Can you share the error logs?",
    timestamp: "10:31 AM",
    isOwn: true,
  },
  {
    id: 5,
    sender: "Alex Kim",
    avatar: "👨‍💼",
    content:
      "Here's what I'm seeing: Error: Forbidden - Invalid token signature",
    timestamp: "10:32 AM",
  },
  {
    id: 6,
    sender: "Sarah Chen",
    avatar: "👩‍💻",
    content:
      "Oh I've seen this before! Check if your JWT secret matches in both environments.",
    timestamp: "10:33 AM",
    reactions: ["💡"],
  },
  {
    id: 7,
    sender: "Emma Watson",
    avatar: "👩‍🔬",
    content:
      "Also make sure you're not using expired tokens. That got me last week 😅",
    timestamp: "10:35 AM",
  },
  {
    id: 8,
    sender: "Alex Kim",
    avatar: "👨‍💼",
    content:
      "Omg that was it! The env file wasn't updated. Thanks everyone! 🙏",
    timestamp: "10:37 AM",
    reactions: ["🎉", "✅", "👏"],
  },
  {
    id: 9,
    sender: "Mike Rodriguez",
    avatar: "👨‍🎨",
    content: "Classic! Happens to the best of us 😄",
    timestamp: "10:38 AM",
  },
  {
    id: 10,
    sender: "You",
    avatar: "😊",
    content: "Glad we could help! Team work makes the dream work ✨",
    timestamp: "10:39 AM",
    isOwn: true,
    reactions: ["❤️", "🚀"],
  },
];

export default function GroupChatApp() {
  const [selectedChat, setSelectedChat] = useState<GroupChat>(groupChats[0]);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>(messages);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: chatMessages.length + 1,
        sender: "You",
        avatar: "😊",
        content: messageInput,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        isOwn: true,
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessageInput("");
    }
  };

  return (
    <div className="h-screen bg-zinc-100 dark:bg-zinc-950 flex">
      {/* Sidebar - Chat List */}
      <div className="w-80 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
              Messages
            </h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Plus className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <InputField
              placeholder="Search conversations..."
              className="pl-10 bg-zinc-100 dark:bg-zinc-800 border-0"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {groupChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-zinc-100 dark:border-zinc-800 cursor-pointer transition-colors ${
                selectedChat.id === chat.id
                  ? "bg-blue-50 dark:bg-blue-950/20 border-l-4 border-l-blue-500"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                    {chat.icon}
                  </div>
                  {chat.online > 0 && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-white truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-zinc-500">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate mb-1">
                    {chat.lastMessage}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      {chat.online} of {chat.members} online
                    </span>
                    {chat.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl">
                {selectedChat.icon}
              </div>
              <div>
                <h2 className="font-semibold text-zinc-900 dark:text-white">
                  {selectedChat.name}
                </h2>
                <p className="text-sm text-zinc-500">
                  {selectedChat.online} of {selectedChat.members} members online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Users className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-950">
          <div className="flex justify-center">
            <div className="bg-zinc-200 dark:bg-zinc-800 rounded-full px-4 py-1 text-xs text-zinc-600 dark:text-zinc-400">
              Today
            </div>
          </div>

          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.isOwn ? "flex-row-reverse" : ""
              }`}
            >
              {!message.isOwn && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-lg flex-shrink-0">
                  {message.avatar}
                </div>
              )}
              <div
                className={`flex flex-col ${
                  message.isOwn ? "items-end" : "items-start"
                } max-w-xl`}
              >
                {!message.isOwn && (
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    {message.sender}
                  </span>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.isOwn
                      ? "bg-blue-500 text-white rounded-br-sm"
                      : "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-zinc-500">
                    {message.timestamp}
                  </span>
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex items-center gap-1 bg-white dark:bg-zinc-800 rounded-full px-2 py-0.5 border border-zinc-200 dark:border-zinc-700">
                      {message.reactions.map((reaction, idx) => (
                        <span key={idx} className="text-xs">
                          {reaction}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex items-end gap-2">
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
              <Plus className="w-5 h-5" />
            </Button>
            <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center gap-2 px-4">
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                <Smile className="w-5 h-5" />
              </Button>
              <InputField
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                <Image className="w-5 h-5" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              className="h-10 w-10 p-0 rounded-full bg-blue-500 hover:bg-blue-600"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-zinc-500 mt-2 ml-14">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>

      {/* Right Sidebar - Members (Optional) */}
      <div className="w-64 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-4 hidden lg:block">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Members ({selectedChat.members})
        </h3>
        <div className="space-y-3">
          {[
            "Sarah Chen",
            "Mike Rodriguez",
            "Alex Kim",
            "Emma Watson",
            "You",
            "David Lee",
            "Chris Park",
            "Lisa Wang",
          ].map((member, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-sm">
                  {member[0]}
                </div>
                {idx < selectedChat.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                  {member}
                </p>
                <p className="text-xs text-zinc-500">
                  {idx < selectedChat.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
