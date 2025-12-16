"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Users,
  Folder,
  TrendingUp,
  MessageSquare,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Plus,
  Send,
  Sparkles,
  LayoutDashboard,
  Badge,
} from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormInput } from "@/components/input/formInput";
import FeedsCard from "@/components/chats/FeedsCard";
import ServerHomeMemberCard from "@/components/server/ServerHomeMemberCard";
import Loader from "@/components/Loader";

// Hooks & Context
import { useServer } from "@/contexts/ServerContext";
import { useGetServer, useGetServerMembers } from "@/lib/hooks/server.hooks";
import { useCreateFeed, useGetServerFeeds } from "@/lib/hooks/feed.hook";
import { useGetProjects } from "@/lib/hooks/project.hook";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

interface FeedFormData {
  content: string;
}

const ServerDetails = () => {
  const { serverId } = useServer();
  const { user } = useAuth();

  // Data Fetching
  const { data: server, isLoading: serverLoading } = useGetServer(
    serverId as string
  );
  const { data: feeds, isLoading: feedsLoading } = useGetServerFeeds(serverId);
  const { data: members } = useGetServerMembers(serverId);
  const { data: projects } = useGetProjects(serverId);

  const { mutateAsync: createFeed, isPending: isPosting } = useCreateFeed();
  const { register, handleSubmit, reset, watch } = useForm<FeedFormData>();

  const content = watch("content");

  const onSubmit = async (data: FeedFormData) => {
    if (!data.content.trim()) return;
    try {
      await createFeed({
        serverId,
        feedData: { content: data.content },
      });
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  // Derived Data
  const recentMembers = members?.slice(0, 5) || [];
  const recentFeed = feeds || [];
  const activeProjects =
    projects?.filter((p) => p.status !== "archived")?.slice(0, 3) || [];

  if (serverLoading) return <Loader variant="ring" />;

  return (
    <div className="space-y-8">
      {/* --- HERO SECTION --- */}
      <div className="relative bg-card rounded-md border border-border overflow-hidden shadow-sm group">
        <div className="px-2">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex items-end gap-4">
              <div className="mt-2">
                <Image
                  src={server?.icon || ""}
                  width={100}
                  height={100}
                  alt="icon"
                  className="rounded-xl object-cover"
                ></Image>
              </div>
              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  {server?.name}
                  {/* Optional Verified/Pro Badge */}
                  <Badge className="h-5">PRO</Badge>
                </h1>
                <p className="text-muted-foreground text-sm max-w-lg line-clamp-1">
                  {server?.description || "Welcome to the workspace."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- STATS BAR --- */}
        <div className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
            <StatItem
              icon={<Folder className="w-4 h-4 text-blue-500" />}
              label="Projects"
              value={server?.total_projects || 0}
            />
            <StatItem
              icon={<Users className="w-4 h-4 text-purple-500" />}
              label="Members"
              value={server?.members?.length || 0}
            />
            <StatItem
              icon={<CheckCircle2 className="w-4 h-4 text-green-500" />}
              label="Completed"
              value={0} // Replace with real stat if available
            />
            <StatItem
              icon={<TrendingUp className="w-4 h-4 text-orange-500" />}
              label="Activity"
              value="High"
            />
          </div>
        </div>
      </div>

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Feed (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Post Composer */}
          <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border border-border">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <FormInput
                    name="content"
                    register={register}
                    placeholder="Share an update, announcement, or idea..."
                    className="bg-muted/30 border-transparent focus:bg-background transition-all min-h-[50px]"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 text-muted-foreground"></div>
                    <Button
                      type="submit"
                      disabled={isPosting || !content}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isPosting ? "Posting..." : "Post Update"}
                      {!isPosting && <Send className="w-3 h-3 ml-2" />}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Feed Stream */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                Discussion Board
              </h2>
              {/* Filter Tabs could go here */}
            </div>

            {feedsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-40 bg-card rounded-xl border border-border animate-pulse"
                  />
                ))}
              </div>
            ) : recentFeed.length > 0 ? (
              recentFeed.map((post: any) => (
                <FeedsCard post={post} key={post.id} />
              ))
            ) : (
              <div className="text-center py-12 bg-card/50 rounded-xl border border-dashed border-border">
                <p className="text-muted-foreground">
                  No updates yet. Be the first to post!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Projects Widget */}
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/20">
              <h3 className="font-semibold flex items-center gap-2 text-sm">
                <LayoutDashboard className="w-4 h-4 text-blue-500" />
                Active Projects
              </h3>
              <Link
                href="projects"
                className="text-xs text-blue-500 hover:underline flex items-center"
              >
                View All <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
            <div className="p-2">
              {activeProjects.length > 0 ? (
                <div className="space-y-1">
                  {activeProjects.map((project) => (
                    <Link href={`projects/${project.id}`} key={project.id}>
                      <div className="group p-3 rounded-lg hover:bg-accent/50 transition-all border border-transparent hover:border-border cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm truncate pr-2 group-hover:text-blue-500 transition-colors">
                            {project.title}
                          </h4>
                          {/* Mini Progress Circle or Badge */}
                          <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">
                            {project.item_count} tasks
                          </span>
                        </div>

                        {/* Mini Progress Bar */}
                        <div className="w-full bg-secondary/50 h-1.5 rounded-full overflow-hidden mb-2">
                          <div
                            className="bg-blue-500 h-full rounded-full"
                            style={{ width: "45%" }} // Replace with actual calculated progress
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex -space-x-1.5">
                            {project.collaborators
                              .slice(0, 3)
                              .map((c: any, i: number) => (
                                <div
                                  key={i}
                                  className="w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center text-[8px]"
                                >
                                  {c.user.username[0]}
                                </div>
                              ))}
                          </div>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(project.created_at)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  No active projects.
                </div>
              )}
            </div>
            <div className="p-2 border-t border-border/50">
              <Button
                variant="ghost"
                className="w-full text-xs h-8 text-muted-foreground hover:text-foreground"
              >
                <Plus className="w-3 h-3 mr-2" /> Create New Project
              </Button>
            </div>
          </div>

          {/* New Members Widget */}
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/20">
              <h3 className="font-semibold flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-purple-500" />
                Team Members
              </h3>
              <Link
                href={`/server/${serverId}/members`}
                className="text-xs text-blue-500 hover:underline flex items-center"
              >
                See All <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
            <div className="p-4 space-y-4">
              {recentMembers.map((member: any) => (
                <ServerHomeMemberCard member={member} key={member.id} />
              ))}
              {(!recentMembers || recentMembers.length === 0) && (
                <div className="text-center text-sm text-muted-foreground">
                  No members found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Stats to keep code clean
const StatItem = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col items-center justify-center p-4 hover:bg-accent/20 transition-colors">
    <div className="flex items-center gap-2 mb-1 text-muted-foreground text-xs font-medium uppercase tracking-wide">
      {icon} {label}
    </div>
    <div className="text-xl font-bold text-foreground">{value}</div>
  </div>
);

export default ServerDetails;
