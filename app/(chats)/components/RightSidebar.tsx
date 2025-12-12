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

const RightSidebar = () => {
  const [selectedChat, setSelectedChat] = useState<GroupChat>(groupChats[0]);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>(messages);
  return (
    <div>
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
};

export default RightSidebar;
