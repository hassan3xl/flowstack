"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import {
  Package,
  Bell,
  AlertCircle,
  CheckCircle2,
  FileText,
  Clock,
  Info,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetnotifications } from "@/lib/hooks/notifications.hook";

// Helper to determine Icon and Color based on priority or content
const getNotificationStyle = (priority: string, title: string) => {
  const lowerTitle = title.toLowerCase();

  // 1. Check Priority first
  if (priority === "high" || priority === "urgent") {
    return { icon: AlertCircle, color: "text-red-500", bgColor: "bg-red-50" };
  }

  // 2. Infer based on Title keywords
  if (lowerTitle.includes("success") || lowerTitle.includes("complete")) {
    return {
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-50",
    };
  }
  if (lowerTitle.includes("order") || lowerTitle.includes("shipped")) {
    return { icon: Package, color: "text-blue-500", bgColor: "bg-blue-50" };
  }
  if (lowerTitle.includes("invoice") || lowerTitle.includes("payment")) {
    return {
      icon: FileText,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    };
  }

  // 3. Default fallback
  return { icon: Bell, color: "text-purple-500", bgColor: "bg-purple-50" };
};

export function NotificationDropdown() {
  const { loading: authLoading } = useAuth();

  // 1. Get data from hook
  const { data: serverData, isLoading: dataLoading } = useGetnotifications();

  // 2. Local state to handle optimistic updates (mark as read)
  const [notifications, setNotifications] = useState<any[]>([]);

  // 3. Sync server data to local state when it arrives
  useEffect(() => {
    if (serverData) {
      setNotifications(serverData);
    }
  }, [serverData]);

  const unreadCount = notifications.filter((msg) => !msg.is_read).length;
  const isLoading = authLoading || dataLoading;

  const markAsRead = (id: number) => {
    // TODO: Add your API mutation call here to update backend
    setNotifications((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, is_read: true } : msg))
    );
  };

  const markAllAsRead = () => {
    // TODO: Add your API mutation call here
    setNotifications((prev) => prev.map((msg) => ({ ...msg, is_read: true })));
  };

  return (
    <div>
      {!isLoading ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-accent mt-1"
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
                <h3 className="font-semibold text-base">Notifications</h3>
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
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  No notifications yet.
                </div>
              ) : (
                notifications.map((msg, index) => {
                  // Generate styles dynamically based on data
                  const style = getNotificationStyle(
                    msg.priority || "medium",
                    msg.title
                  );
                  const Icon = style.icon;

                  return (
                    <div key={msg.id}>
                      <div
                        onClick={() => markAsRead(msg.id)}
                        className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
                          !msg.is_read ? "bg-muted/95" : ""
                        }`}
                      >
                        <div className="flex gap-3">
                          {/* Icon */}
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-full ${style.bgColor} flex items-center justify-center`}
                          >
                            <Icon className={`h-5 w-5 ${style.color}`} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4
                                className={`text-sm font-medium truncate ${
                                  !msg.is_read ? "font-semibold" : ""
                                }`}
                              >
                                {msg.title}
                              </h4>
                              {!msg.is_read && (
                                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {msg.message}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {/* Using time_since from backend */}
                              <span>{msg.time_since} ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < notifications.length - 1 && (
                        <div className="border-b mx-4" />
                      )}
                    </div>
                  );
                })
              )}
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
      ) : (
        // Loading State
        <div className="h-10 w-10 flex items-center justify-center">
          <div className="h-5 w-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
