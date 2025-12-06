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
import { useToast } from "@/providers/ToastProvider";
import { apiService } from "@/lib/services/apiService";
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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const getProfile = async () => {
    try {
      setLoading(true);
      const response: UserProfile = await apiService.get("api/auth/user/");
      setProfile(response);
    } catch (err: any) {
      toast.error(err.detail || "an error occured");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Simulate file upload
      const formData = new FormData();
      formData.append("avatar", file);

      toast.success("Avatar uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload avatar. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="bg-secondary text-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Image
                src={profile?.profile.avatar || "/pngs/default-avatar/png"}
                className=" rounded-full"
                height={100}
                width={100}
                alt="avatar"
              ></Image>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
            </div>
            <Button>
              <Edit3 size={16} className="mr-2" />
              Edit
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
                value={profile?.profile.first_name || ""}
                onChange={(e) => e}
              />
              <InputField
                field="input"
                label="First Name"
                icon={User}
                placeholder="Enter your Firstname"
                value={profile?.profile.last_name || ""}
                onChange={(e) => e}
              />
              <InputField
                field="input"
                label="email"
                icon={User}
                placeholder="Enter your email address"
                value={profile?.email || ""}
                onChange={(e) => e}
              />
              <InputField
                field="input"
                label="Phone"
                icon={User}
                placeholder="Enter your phone number"
                value={profile?.profile.phone_number || ""}
                onChange={(e) => e}
              />
            </div>
            <div>
              <InputField
                field="textarea"
                label="Bio"
                placeholder="Enter your Bio"
                value={profile?.profile.bio || ""}
                onChange={(e) => e}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
