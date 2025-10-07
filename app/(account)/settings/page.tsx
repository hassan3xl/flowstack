"use client";

type UserSettings = {
  theme: "light";
  language: "en";
  items_per_page: 10;
  default_due_date_days: 7;
  enable_email_notifications: true;
  enable_push_notifications: true;
  auto_archive_completed: true;
  created_at: "";
  updated_at: "";
};
import Loader from "@/components/Loader";
// components/SettingsPage.tsx
import React, { useState, useEffect } from "react";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "profile" | "preferences" | "notifications"
  >("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [settings, setSettings] = useState<UserSettings>({
    theme: "light",
    language: "en",
    items_per_page: 10,
    default_due_date_days: 7,
    enable_email_notifications: true,
    enable_push_notifications: true,
    auto_archive_completed: true,
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {}, []);

  // if (loading) {
  //   return <Loader />;
  // }

  const tabs = [
    { id: "preferences", label: "Preferences", icon: "⚙️" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold ">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className=" border border-secondary bg-secondary shadow rounded-lg">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Tab */}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Theme
                    </label>
                    <select
                      value={settings.theme}
                      onChange={(e) =>
                        setSettings({ ...settings, theme: e.target.value })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) =>
                        setSettings({ ...settings, language: e.target.value })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Items per page
                    </label>
                    <select
                      value={settings.items_per_page}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          items_per_page: parseInt(e.target.value),
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Default due date (days from now)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={settings.default_due_date_days}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          default_due_date_days: parseInt(e.target.value) || 7,
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="auto_archive_completed"
                      checked={settings.auto_archive_completed}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          auto_archive_completed: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="auto_archive_completed"
                      className="ml-2 block text-sm "
                    >
                      Auto-archive completed items after 30 days
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700  border border-secondary bg-secondary border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Changes
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save Preferences"}
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium  mb-4">
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium ">
                          Email Notifications
                        </h4>
                        <p className="text-sm text-gray-500">
                          Receive notifications via email
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.enable_email_notifications}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            enable_email_notifications: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium ">
                          Push Notifications
                        </h4>
                        <p className="text-sm text-gray-500">
                          Receive push notifications in your browser
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.enable_push_notifications}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            enable_push_notifications: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-sm font-medium  mb-3">
                    Email Notification Types
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        key: "project_updates",
                        label: "Project Updates",
                        desc: "When projects are created, updated, or shared with you",
                      },
                      {
                        key: "due_dates",
                        label: "Due Date Reminders",
                        desc: "Reminders for upcoming due dates",
                      },
                      {
                        key: "completion",
                        label: "Task Completion",
                        desc: "When tasks are completed by collaborators",
                      },
                      {
                        key: "weekly_summary",
                        label: "Weekly Summary",
                        desc: "Weekly summary of your projects and tasks",
                      },
                    ].map((notif) => (
                      <div
                        key={notif.key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h5 className="text-sm font-medium ">
                            {notif.label}
                          </h5>
                          <p className="text-xs text-gray-500">{notif.desc}</p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          disabled={!settings.enable_email_notifications}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
