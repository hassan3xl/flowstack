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
import MessageInput from "../components/MessageInput";

export default function GroupChatApp() {
  const [selectedChat, setSelectedChat] = useState<GroupChat>(groupChats[0]);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>(messages);

  return (
    <div className="h-screen bg-zinc-100 dark:bg-zinc-950 flex">
      {/* Sidebar - Chat List */}
      <LeftSidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <ChatHeader />

        {/* Messages Area */}
        <ChatArea />

        {/* Message Input */}
        <MessageInput />
      </div>

      {/* Right Sidebar - Members (Optional) */}
      <RightSidebar />
    </div>
  );
}
