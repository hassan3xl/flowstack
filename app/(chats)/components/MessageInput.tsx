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
import ChatArea from "../components/ChatArea";
import RightSidebar from "../components/RightSidebar";

const MessageInput = () => {
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
    <div>
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
  );
};

export default MessageInput;
