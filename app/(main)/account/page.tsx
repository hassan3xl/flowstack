"use client";

import React, { useState } from "react";
import { User, Settings, CreditCard, Bell, Shield, LogOut } from "lucide-react";
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
import {
  useGetProfile,
  useUpdateProfile,
  useUploaadAvatar,
} from "@/lib/hooks/account.hook";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/input/formInput";
import { toast } from "sonner";

const sidebarNavItems = [
  { title: "Profile", icon: User, id: "profile" },
  { title: "Account", icon: Settings, id: "account" },
  { title: "Notifications", icon: Bell, id: "notifications" },
];

const handleLogout = async () => {
  await fetch("/api/logout", { method: "POST" });
  toast.success("You have been logged out.");
  window.location.href = "/";
};

interface ProfileForm {
  first_name: string;
  last_name: string;
  username: string;
  bio: string;
}

// 1. Sidebar Navigation
const SidebarNav = ({ items, activeTab, setActiveTab }: any) => {
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto pb-4 lg:pb-0">
      {items.map((item: any) => (
        <Button
          key={item.id}
          variant={activeTab === item.id ? "secondary" : "ghost"}
          className={`justify-start ${
            activeTab === item.id
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline"
          }`}
          onClick={() => setActiveTab(item.id)}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Button>
      ))}
      <Button
        variant="ghost"
        onClick={handleLogout}
        className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 hidden lg:flex"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </nav>
  );
};

const ProfileForm = () => {
  const { data: profile, isLoading } = useGetProfile();
  const updateProfile = useUpdateProfile();
  const uploadAvatar = useUploaadAvatar();

  const { register, handleSubmit } = useForm<ProfileForm>();

  if (isLoading) return <div>Loading...</div>;

  const onUpdateProfile = (data: ProfileForm) => {
    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      bio: data.bio,
    };

    updateProfile.mutateAsync(payload);
  };

  // Handle only avatar file upload
  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("file", file);

    const formData = new FormData();
    formData.append("avatar", file);
    uploadAvatar.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6">
      {/* Avatar Upload */}
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile?.avatar} alt="Avatar" />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>

        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById("avatarInput")?.click()}
            type="button"
          >
            Change Avatar
          </Button>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onAvatarChange}
          />
        </div>
      </div>

      {/* --- Profile Fields --- */}
      <div className="grid gap-4 py-4">
        {/* FULL NAME (DISABLED) */}
        <div className="grid gap-2">
          <Label>Display Name</Label>
          <Input
            disabled
            value={profile?.full_name || ""}
            className="bg-muted cursor-not-allowed"
          />
        </div>

        {/* FIRST NAME */}
        <div className="grid gap-2">
          <Label>First Name</Label>
          <Input
            {...register("first_name")}
            defaultValue={profile?.first_name}
          />
        </div>

        {/* LAST NAME */}
        <div className="grid gap-2">
          <Label>Last Name</Label>
          <Input {...register("last_name")} defaultValue={profile?.last_name} />
        </div>

        {/* USERNAME */}
        <div className="grid gap-2">
          <Label>Username</Label>
          <Input {...register("username")} defaultValue={profile?.username} />
        </div>

        {/* EMAIL (DISABLED — USER MODEL) */}
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input
            disabled
            value={profile?.user?.email}
            className="bg-muted cursor-not-allowed"
          />
        </div>

        {/* BIO */}
        <div className="grid gap-2">
          <Label>Bio</Label>
          <Textarea {...register("bio")} defaultValue={profile?.bio} />
        </div>
      </div>

      <Button type="submit" disabled={updateProfile.isPending}>
        {updateProfile.isPending ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
};

// 3. Account Form (The 'Account' Tab Content)
const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, you'll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Password</Button>
        </CardFooter>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently remove your account and all of its content.
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 4. Placeholder for other tabs
const PlaceholderContent = ({ title }: any) => (
  <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
      <h3 className="mt-4 text-lg font-semibold">No {title} configured</h3>
      <p className="mb-4 mt-2 text-sm text-muted-foreground">
        This is just a dummy section to demonstrate the layout.
      </p>
      <Button size="sm" variant="secondary">
        Add {title}
      </Button>
    </div>
  </div>
);

// --- Main Component ---
export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container">
      {/* Header Section */}
      <div className="space-y-0.5 mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <Separator className="my-6" />

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {/* Sidebar */}
        <aside className="-mx-4 lg:w-1/5 px-4">
          <SidebarNav
            items={sidebarNavItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </aside>

        {/* Content Area */}
        <div className="flex-1 lg:max-w-2xl">
          {activeTab === "profile" && <ProfileForm />}
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "billing" && <PlaceholderContent title="Billing" />}
          {activeTab === "notifications" && (
            <PlaceholderContent title="Notifications" />
          )}
        </div>
      </div>
    </div>
  );
}
