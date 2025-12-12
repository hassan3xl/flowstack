"use client";
import { InputField } from "@/components/input/InputField";
import { Button } from "@/components/ui/button";
import { Plus, Search, Settings } from "lucide-react";
import React, { useState } from "react";
import { GroupChat, groupChats, Message, messages } from "./data";

const LeftSidebar = () => {
  const [selectedChat, setSelectedChat] = useState<GroupChat>(groupChats[0]);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>(messages);
  return (
    <div>
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
    </div>
  );
};

export default LeftSidebar;
