"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import {
  User,
  LogOut,
  User2,
  MessageSquare,
  Clock,
  CheckCheck,
  Check,
  Image as ImageIcon,
  Mic,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

// Dummy DM data
const DIRECT_MESSAGES = [
  {
    id: 1,
    userId: "user1",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    message: "Hey! Did you see the new design?",
    time: "2m ago",
    unread: 3,
    online: true,
    typing: false,
    messageType: "text",
  },
  {
    id: 2,
    userId: "user2",
    name: "Mike Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    message: "Thanks for your help earlier!",
    time: "15m ago",
    unread: 1,
    online: true,
    typing: false,
    messageType: "text",
  },
  {
    id: 3,
    userId: "user3",
    name: "Emma Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    message: "Sent a photo",
    time: "1h ago",
    unread: 0,
    online: false,
    typing: false,
    messageType: "image",
    seen: true,
  },
  {
    id: 4,
    userId: "user4",
    name: "Alex Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    message: "Let's schedule a meeting for tomorrow",
    time: "3h ago",
    unread: 0,
    online: false,
    typing: false,
    messageType: "text",
    seen: false,
  },
  {
    id: 5,
    userId: "user5",
    name: "Lisa Park",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    message: "Voice message (0:45)",
    time: "1d ago",
    unread: 0,
    online: true,
    typing: false,
    messageType: "voice",
    seen: true,
  },
];

export function MessagesDropdown() {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState(DIRECT_MESSAGES);

  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [open, setOpen] = useState(false);

  const unreadCount = messages.reduce((sum, msg) => sum + msg.unread, 0);

  const markAsRead = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, unread: 0 } : msg))
    );
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-3 w-3" />;
      case "voice":
        return <Mic className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div>
      {!loading && (
        <>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-accent"
                >
                  <MessageSquare className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[380px] p-0">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div>
                    <h3 className="font-semibold text-base">Messages</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {unreadCount > 0
                        ? `${unreadCount} unread ${
                            unreadCount === 1 ? "message" : "messages"
                          }`
                        : "No unread messages"}
                    </p>
                  </div>
                  <Link href="/messages/compose">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 px-2"
                    >
                      New
                    </Button>
                  </Link>
                </div>

                {/* Messages List */}
                <div className="max-h-[450px] overflow-y-auto">
                  {messages.map((dm, index) => (
                    <div key={dm.id}>
                      <Link href={`/messages/${dm.userId}`}>
                        <div
                          onClick={() => markAsRead(dm.id)}
                          className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
                            dm.unread > 0 ? "bg-blue-50/50" : ""
                          }`}
                        >
                          <div className="flex gap-3">
                            {/* Avatar with online status */}
                            <div className="relative flex-shrink-0">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={dm.avatar} alt={dm.name} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                  {dm.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {dm.online && (
                                <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white" />
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4
                                  className={`text-sm truncate ${
                                    dm.unread > 0
                                      ? "font-semibold text-foreground"
                                      : "font-medium text-foreground"
                                  }`}
                                >
                                  {dm.name}
                                </h4>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className="text-xs text-muted-foreground">
                                    {dm.time}
                                  </span>
                                  {dm.unread > 0 && (
                                    <div className="min-w-[20px] h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-semibold px-1.5">
                                      {dm.unread}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {dm.unread === 0 && dm.seen && (
                                  <CheckCheck className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                                )}
                                {dm.unread === 0 && !dm.seen && (
                                  <Check className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                                )}
                                {getMessageIcon(dm.messageType) && (
                                  <span className="text-muted-foreground flex-shrink-0">
                                    {getMessageIcon(dm.messageType)}
                                  </span>
                                )}
                                <p
                                  className={`text-sm truncate ${
                                    dm.unread > 0
                                      ? "font-medium text-foreground"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {dm.typing ? (
                                    <span className="text-blue-500 italic">
                                      typing...
                                    </span>
                                  ) : (
                                    dm.message
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      {index < messages.length - 1 && (
                        <div className="border-b mx-4" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t p-2">
                  <Link href="/messages">
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-sm font-medium"
                    >
                      View All Messages
                    </Button>
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      )}
      {loading && (
        <div className="h-10 w-10 bg-accent/50 rounded-md animate-pulse" />
      )}
    </div>
  );
}
