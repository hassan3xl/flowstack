"use client";

import React, { useState } from "react";
import {
  User,
  Settings,
  Bell,
  LogOut,
  Camera,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Hooks
import {
  useGetProfile,
  useUpdateProfile,
  useUploaadAvatar,
} from "@/lib/hooks/account.hook";

// --- Types & Constants ---
const sidebarNavItems = [
  { title: "Profile", icon: User, id: "profile" },
  { title: "Account", icon: Settings, id: "account" },
];

interface ProfileFormType {
  first_name: string;
  last_name: string;
  username: string;
  bio: string;
}

// --- Helper Functions ---
const handleLogout = async () => {
  try {
    await fetch("/api/logout", { method: "POST" });
    toast.success("See you next time!");
    // Allow toast to show before redirecting
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    toast.error("Failed to log out");
  }
};

const SidebarNav = ({ items, activeTab, setActiveTab }: any) => {
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
      {items.map((item: any) => (
        <Button
          key={item.id}
          variant={activeTab === item.id ? "secondary" : "ghost"}
          className={`justify-start shrink-0 ${
            activeTab === item.id
              ? "bg-secondary font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-transparent hover:underline lg:hover:bg-accent lg:hover:no-underline"
          }`}
          onClick={() => setActiveTab(item.id)}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Button>
      ))}

      <Separator className="my-2 hidden lg:block" />

      {/* LOGOUT BUTTON - Visible on Mobile (scroll end) and Desktop (bottom) */}
      <Button
        variant="ghost"
        onClick={handleLogout}
        className="justify-start shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </nav>
  );
};

// ------------------------------------------------------------------
// 2. PROFILE FORM COMPONENT
// ------------------------------------------------------------------
const ProfileForm = () => {
  const { data: profile, isLoading } = useGetProfile();
  const updateProfile = useUpdateProfile();
  const uploadAvatar = useUploaadAvatar();

  const { register, handleSubmit } = useForm<ProfileFormType>();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );

  const onUpdateProfile = async (data: ProfileFormType) => {
    try {
      await updateProfile.mutateAsync(data);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    toast.promise(uploadAvatar.mutateAsync(formData), {
      loading: "Uploading avatar...",
      success: "Avatar updated!",
      error: "Failed to upload avatar",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onUpdateProfile)}
      className="space-y-8 animate-in fade-in duration-500"
    >
      {/* Avatar Section */}
      <div className="flex items-center gap-6 p-4 border rounded-xl bg-card">
        <div className="relative group cursor-pointer">
          <Avatar className="h-24 w-24 border-2 border-border">
            <AvatarImage
              src={profile?.avatar}
              alt="Avatar"
              className="object-cover"
            />
            <AvatarFallback className="text-xl bg-secondary">
              {profile?.username?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* Hover Overlay */}
          <div
            onClick={() => document.getElementById("avatarInput")?.click()}
            className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-medium">Profile Picture</h3>
          <p className="text-sm text-muted-foreground">
            Click on the image to upload a new one. <br /> JPG, GIF or PNG.
          </p>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onAvatarChange}
          />
        </div>
      </div>

      <Separator />

      {/* Fields Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>First Name</Label>
            <Input
              {...register("first_name")}
              defaultValue={profile?.first_name}
              placeholder="e.g. Jane"
            />
          </div>
          <div className="grid gap-2">
            <Label>Last Name</Label>
            <Input
              {...register("last_name")}
              defaultValue={profile?.last_name}
              placeholder="e.g. Doe"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Username</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">
              @
            </span>
            <Input
              {...register("username")}
              defaultValue={profile?.username}
              className="pl-7"
            />
          </div>
          <p className="text-[0.8rem] text-muted-foreground">
            This is your public display name.
          </p>
        </div>

        <div className="grid gap-2">
          <Label>Bio</Label>
          <Textarea
            {...register("bio")}
            defaultValue={profile?.bio}
            className="resize-none min-h-[100px]"
            placeholder="Tell us a little bit about yourself"
          />
        </div>

        {/* Read Only Fields */}
        <div className="pt-4">
          <Label className="text-muted-foreground">Linked Email</Label>
          <Input
            disabled
            value={profile?.user?.email}
            className="mt-1.5 bg-muted/50 text-muted-foreground border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={updateProfile.isPending}>
          {updateProfile.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save Changes
        </Button>
      </div>
    </form>
  );
};

// ------------------------------------------------------------------
// 3. ACCOUNT SETTINGS COMPONENT
// ------------------------------------------------------------------
const AccountSettings = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, you'll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" />
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/20 px-6 py-4">
          <Button>Update Password</Button>
        </CardFooter>
      </Card>

      <Card className="border-red-500/20 bg-red-500/5 overflow-hidden">
        <CardHeader>
          <div className="flex items-center gap-2 text-red-600">
            <ShieldAlert className="w-5 h-5" />
            <CardTitle>Danger Zone</CardTitle>
          </div>
          <CardDescription className="text-red-600/80">
            Irreversible and destructive actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-red-200 bg-background p-4 dark:border-red-900/50">
            <div className="space-y-1">
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently remove your account and all data.
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 4. Placeholder
const PlaceholderContent = ({ title }: any) => (
  <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed bg-muted/30 animate-in fade-in zoom-in-95">
    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mb-4 mt-2 text-sm text-muted-foreground">
        There are no settings to configure for this section yet.
      </p>
    </div>
  </div>
);

// ------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ------------------------------------------------------------------
export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="">
      {/* Header */}
      <div className="space-y-1 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground text-lg">
          Manage your account settings and preferences.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {/* Sidebar */}
        <aside className="lg:w-1/4">
          <SidebarNav
            items={sidebarNavItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 lg:max-w-3xl">
          {activeTab === "profile" && <ProfileForm />}
          {activeTab === "account" && <AccountSettings />}
        </div>
      </div>
    </div>
  );
}
