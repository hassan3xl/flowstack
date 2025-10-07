"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Globe,
  Trash2,
  Upload,
} from "lucide-react";
import { InputField } from "@/components/input/InputField";
import { useToast } from "@/components/providers/ToastProvider";
import { apiService } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UserProfile {
  id: string;
  email: string;
  profile: {
    first_name: string;
    last_name: string;
    bio: string;
    phone_number: string;
    avatar: string | null;
    timezone: string;
    email_notifications: boolean;
  };
}

const ProfilePage: React.FC = () => {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const response: UserProfile = await apiService.get("api/auth/user/");
        setProfile(response);
        setEditedProfile(response);
      } catch (err) {
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const handleProfileUpdate = async () => {
    if (!editedProfile) return;

    try {
      const response = await apiService.put("api/auth/user/", editedProfile);
      setProfile(response);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Simulate file upload
      const formData = new FormData();
      formData.append("avatar", file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setEditedProfile((prev) => ({ ...prev, avatar: previewUrl }));

      toast.success("Avatar uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload avatar. Please try again.");
    }
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    country: "",
    gender: "",
  });

  const handleChange =
    (field: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="bg-secondary text-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Image
                src={
                  editedProfile?.profile.avatar || "/pngs/default-avatar/png"
                }
                className=" rounded-full"
                height={100}
                width={100}
                alt="avatar"
              ></Image>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                {isEditing && (
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Camera size={14} />
                  </Button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
            </div>
            <Button
              onClick={() => {
                if (isEditing) {
                  handleProfileUpdate();
                } else {
                  setIsEditing(true);
                  setEditedProfile(profile);
                }
              }}
            >
              {isEditing ? (
                <Save size={16} className="mr-2" />
              ) : (
                <Edit3 size={16} className="mr-2" />
              )}
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:col-span-2">
          <div className="text-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-200">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                field="input"
                label="First Name"
                icon={User}
                placeholder="Enter your Firstname"
                value={editedProfile?.profile.first_name || ""}
                onChange={(e) =>
                  setEditedProfile((prev) =>
                    prev
                      ? {
                          ...prev,
                          profile: {
                            ...prev.profile,
                            first_name: e.target.value,
                          },
                        }
                      : prev
                  )
                }
              />
              <InputField
                field="input"
                label="First Name"
                icon={User}
                placeholder="Enter your Firstname"
                value={editedProfile?.profile.last_name || ""}
                onChange={(e) =>
                  setEditedProfile((prev) =>
                    prev
                      ? {
                          ...prev,
                          profile: {
                            ...prev.profile,
                            last_name: e.target.value,
                          },
                        }
                      : prev
                  )
                }
              />
              <InputField
                field="input"
                label="email"
                icon={User}
                placeholder="Enter your email address"
                value={editedProfile?.email || ""}
                onChange={handleChange("username")}
              />
              <InputField
                field="input"
                label="Phone"
                icon={User}
                placeholder="Enter your phone number"
                value={editedProfile?.profile.phone_number || ""}
                onChange={handleChange("username")}
              />
            </div>
            <div>
              <InputField
                field="textarea"
                label="Bio"
                placeholder="Enter your Bio"
                value={editedProfile?.profile.bio || ""}
                onChange={handleChange("bio")}
              />

              {isEditing && (
                <div className="mt-6 flex space-x-4">
                  <Button onClick={handleProfileUpdate}>Save Changes</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedProfile(profile);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
