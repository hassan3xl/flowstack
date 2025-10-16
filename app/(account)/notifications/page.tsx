"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  Check,
  X,
  MessageSquare,
  Heart,
  UserPlus,
  Settings,
  Filter,
  Trash2,
} from "lucide-react";
import { apiService } from "@/services/apiService";
import { useToast } from "@/components/providers/ToastProvider";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "message" | "like" | "follow" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await apiService.get("/api/notifications");
      setNotifications(response);
    } catch (error: any) {
      toast.error(error.detail);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <Loader />
  }
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="w-5 h-5" />;
      case "like":
        return <Heart className="w-5 h-5" />;
      case "follow":
        return <UserPlus className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "message":
        return "bg-blue-100 text-blue-600";
      case "like":
        return "bg-rose-100 text-rose-600";
      case "follow":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="rounded-2xl shadow-sm border color-border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-tertiary p-3 rounded-xl">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold ">
                  Notifications
                </h1>
                <p className="text-sm text-muted">
                  {unreadCount > 0
                    ? `${unreadCount} unread notification${
                        unreadCount > 1 ? "s" : ""
                      }`
                    : "All caught up!"}
                </p>
              </div>
            </div>
            <Button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-muted" />
            </Button>
          </div>

          {/* Filter and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All
              </Button>
              <Button
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "unread"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Unread
              </Button>
            </div>
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Check className="w-4 h-4" />
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No notifications
              </h3>
              <p className="text-slate-500">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm border border-slate-200 p-5 transition-all hover:shadow-md ${
                  !notification.read ? "border-l-4 border-l-blue-500" : ""
                }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full ${getIconColor(
                      notification.type
                    )} flex items-center justify-center`}
                  >
                    {getIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">
                        {notification.title}
                      </h3>
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      {notification.message}
                    </p>

                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Button
                          onClick={() => markAsRead(notification.id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Check className="w-3 h-3" />
                          Mark as read
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteNotification(notification.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
