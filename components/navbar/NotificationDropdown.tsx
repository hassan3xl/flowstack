"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import {
  User,
  LogOut,
  User2,
  Mail,
  MailOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Package,
  Bell,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { resetAuthCookies } from "@/lib/actions/auth.actions";

// Dummy inbox data
const INBOX_MESSAGES = [
  {
    id: 1,
    type: "order",
    icon: Package,
    title: "Order Shipped",
    message: "Your order #1234 has been shipped and is on its way",
    time: "2 hours ago",
    read: false,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    type: "notification",
    icon: Bell,
    title: "New Feature Available",
    message: "Check out our new dashboard analytics",
    time: "5 hours ago",
    read: false,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: 3,
    type: "alert",
    icon: AlertCircle,
    title: "Payment Required",
    message: "Your subscription payment is due in 3 days",
    time: "1 day ago",
    read: true,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: 4,
    type: "success",
    icon: CheckCircle2,
    title: "Profile Updated",
    message: "Your profile information has been successfully updated",
    time: "2 days ago",
    read: true,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: 5,
    type: "document",
    icon: FileText,
    title: "New Invoice",
    message: "Invoice #INV-2024-001 is ready for download",
    time: "3 days ago",
    read: true,
    color: "text-gray-500",
    bgColor: "bg-gray-50",
  },
];

export function NotificationDropdown() {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState(INBOX_MESSAGES);

  const unreadCount = messages.filter((msg) => !msg.read).length;

  const markAsRead = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const markAllAsRead = () => {
    setMessages((prev) => prev.map((msg) => ({ ...msg, read: true })));
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
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[380px] p-0">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div>
                    <h3 className="font-semibold text-base">Inbox</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      You have {unreadCount} unread{" "}
                      {unreadCount === 1 ? "message" : "messages"}
                    </p>
                  </div>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs h-7 px-2"
                    >
                      Mark all read
                    </Button>
                  )}
                </div>

                {/* Messages List */}
                <div className="max-h-[400px] overflow-y-auto">
                  {messages.map((msg, index) => {
                    const Icon = msg.icon;
                    return (
                      <div key={msg.id}>
                        <div
                          onClick={() => markAsRead(msg.id)}
                          className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
                            !msg.read ? "bg-blue-50/50" : ""
                          }`}
                        >
                          <div className="flex gap-3">
                            {/* Icon */}
                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-full ${msg.bgColor} flex items-center justify-center`}
                            >
                              <Icon className={`h-5 w-5 ${msg.color}`} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4
                                  className={`text-sm font-medium truncate ${
                                    !msg.read ? "font-semibold" : ""
                                  }`}
                                >
                                  {msg.title}
                                </h4>
                                {!msg.read && (
                                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {msg.message}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{msg.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < messages.length - 1 && (
                          <div className="border-b mx-4" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="border-t p-2">
                  <Link href="/inbox">
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
