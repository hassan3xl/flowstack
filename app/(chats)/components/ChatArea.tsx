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
import { GroupChat, groupChats, Message, messages } from "../components/data";
import LeftSidebar from "../components/LeftSidebar";
import ChatHeader from "../components/ChatHeader";

const ChatArea = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>(messages);
  return (
    <div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-950">
        <div className="flex justify-center">
          <div className="bg-zinc-200 dark:bg-zinc-800 rounded-full px-4 py-1 text-xs text-zinc-600 dark:text-zinc-400">
            Today
          </div>
        </div>

        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : ""}`}
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
    </div>
  );
};

export default ChatArea;
