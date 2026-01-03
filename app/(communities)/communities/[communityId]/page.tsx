"use client";

import React, { useState } from "react";
import {
  Users,
  Globe,
  Settings,
  MessageSquare,
  Info,
  ShieldCheck,
  Share2,
  Bell,
  Hash,
  Plus,
  Search,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostsCard from "@/components/community/posts/PostsCard";
import { useGetCommunityPosts } from "@/lib/hooks/post.hook";
import { useCommunity } from "@/contexts/CommunityContext";
import { useGetCommunity } from "@/lib/hooks/community.hooks";
import Loader from "@/components/Loader";
import { useAuth } from "@/contexts/AuthContext";

const CommunityDetailsPage = () => {
  const { communityId } = useCommunity();
  const { user } = useAuth();
  const { data: posts } = useGetCommunityPosts(communityId);
  const { data: community, isLoading } = useGetCommunity(communityId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      {/* 1. Hero Banner Section */}
      <div className="relative h-48 md:h-64 w-full bg-muted overflow-hidden">
        <img
          src={community?.banner}
          className="w-full h-full object-cover opacity-80"
          alt="banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* 2. Profile Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col md:flex-row gap-6 md:items-end">
            <Avatar className="w-32 h-32 rounded-3xl border-4 border-background shadow-xl">
              <AvatarImage src={community.icon} />
              <AvatarFallback className="text-4xl bg-blue-600 text-white font-bold">
                {community.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1 mb-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">
                  {community.name}
                </h1>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                >
                  {community.category_name}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {community.member_count.toLocaleString()} members
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span className="capitalize">
                    {community.visibility} Community
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="w-4 h-4" />
            </Button>
            {community.is_owner ? (
              <Button className="rounded-xl gap-2">
                <Settings className="w-4 h-4" /> Manage
              </Button>
            ) : (
              <Button className="rounded-xl bg-blue-600 hover:bg-blue-700">
                Join Community
              </Button>
            )}
          </div>
        </div>

        {/* 3. Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Center: Tabs and Content */}
          <div className="lg:col-span-6 space-y-6">
            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 gap-8">
                <TabsTrigger
                  value="feed"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent px-0 pb-3 text-base font-semibold"
                >
                  Feed
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent px-0 pb-3 text-base font-semibold"
                >
                  Members
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent px-0 pb-3 text-base font-semibold"
                >
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="mt-6 space-y-4">
                {/* Dummy Post Input */}
                <div className="bg-card border border-border rounded-2xl p-4 flex gap-4 shadow-sm">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <input
                      className="w-full bg-muted/50 border-none rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder={`Post something in ${community.name}...`}
                    />
                  </div>
                </div>
                {posts?.map((post: any) => (
                  <PostsCard post={post} />
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar: About & Stats */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Info className="w-4 h-4 text-blue-500" />
                About Community
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {community.description}
              </p>
              <div className="pt-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">
                    {new Date(community.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{community.category_name}</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 border border-border rounded-2xl p-5">
              <h4 className="font-bold text-sm mb-4">Active Members</h4>
              <div className="flex -space-x-3 overflow-hidden">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Avatar
                    key={i}
                    className="border-2 border-background w-10 h-10"
                  >
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                ))}
                <div className="w-10 h-10 rounded-full bg-accent border-2 border-background flex items-center justify-center text-[10px] font-bold">
                  +1.2k
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailsPage;
