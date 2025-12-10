"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Check,
  Trash2,
  Settings,
  Filter,
  CheckCheck,
  User,
  MessageSquare,
  Heart,
  DollarSign,
  AlertCircle,
  X,
} from "lucide-react";

interface Notification {
  id: string;
  type: "message" | "like" | "comment" | "payment" | "alert" | "mention";
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
}

const NotificationsPage = () => {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      title: "New message from Sarah",
      description: "Hey! Can we schedule a meeting for tomorrow?",
      time: "2m ago",
      read: false,
      avatar: "/avatars/sarah.jpg",
    },
    {
      id: "2",
      type: "like",
      title: "John liked your post",
      description: "Your post about React hooks received a like",
      time: "1h ago",
      read: false,
      avatar: "/avatars/john.jpg",
    },
    {
      id: "3",
      type: "comment",
      title: "New comment on your post",
      description: "Emily commented: 'Great insights! Thanks for sharing.'",
      time: "3h ago",
      read: true,
      avatar: "/avatars/emily.jpg",
    },
    {
      id: "4",
      type: "payment",
      title: "Payment received",
      description: "You received $150.00 from Project Alpha",
      time: "5h ago",
      read: false,
    },
    {
      id: "5",
      type: "alert",
      title: "System maintenance scheduled",
      description: "Platform will be down for maintenance on Sunday 2AM-4AM",
      time: "1d ago",
      read: true,
    },
    {
      id: "6",
      type: "mention",
      title: "You were mentioned",
      description: "Mike mentioned you in a comment",
      time: "2d ago",
      read: true,
      avatar: "/avatars/mike.jpg",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case "message":
        return <MessageSquare className={iconClass} />;
      case "like":
        return <Heart className={iconClass} />;
      case "comment":
        return <MessageSquare className={iconClass} />;
      case "payment":
        return <DollarSign className={iconClass} />;
      case "alert":
        return <AlertCircle className={iconClass} />;
      case "mention":
        return <User className={iconClass} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return "bg-blue-100 text-blue-600";
      case "like":
        return "bg-pink-100 text-pink-600";
      case "comment":
        return "bg-purple-100 text-purple-600";
      case "payment":
        return "bg-green-100 text-green-600";
      case "alert":
        return "bg-orange-100 text-orange-600";
      case "mention":
        return "bg-indigo-100 text-indigo-600";
      default:
        return "bg-card text-gray-600";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div className="min-h-screen rounded-xl p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-accent rounded-2xl shadow-sm border border-border 0 p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-card rounded-xl">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  Notifications
                </h1>
                <p className="text-sm text-secondary-foreground">
                  {unreadCount} unread{" "}
                  {unreadCount === 1 ? "notification" : "notifications"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 rounded-lg p-1">
              <div className="flex gap-2 bg-card  rounded-lg p-1">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === "all"
                      ? " dark:bg-gray-600 text-primary shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === "unread"
                      ? " dark:bg-gray-600 text-primary shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Unread {unreadCount > 0 && `(${unreadCount})`}
                </button>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1"></div>

            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                variant="outline"
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all read
              </Button>
            )}

            {notifications.length > 0 && (
              <Button
                onClick={clearAll}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear all
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className="rounded-2xl shadow-sm border border-border p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-card dark:bg-gray-700 rounded-full mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                No notifications
              </h3>
              <p className="text-secondary-foreground">
                {filter === "unread"
                  ? "You're all caught up! No unread notifications."
                  : "You don't have any notifications yet."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-xl shadow-sm border border-border p-4 transition-all hover:shadow-md group ${
                  !notification.read
                    ? "ring-2 ring-blue-500 ring-opacity-50"
                    : ""
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${getIconColor(
                      notification.type
                    )}`}
                  >
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3
                        className={`font-semibold ${
                          notification.read
                            ? "text-gray-700 dark:text-gray-300"
                            : "text-primary"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 hover:bg-card dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
