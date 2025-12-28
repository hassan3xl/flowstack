"use client";

import React from "react";
import HomePosts from "@/components/community/posts/HomePosts";
import Link from "next/link";
import { Layout, Users, ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import { useGetWorkspaces } from "@/lib/hooks/workspace.hook";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useGetCommunities } from "@/lib/hooks/community.hooks";

const pendingInvites = 2;

const Home = () => {
  const { data: workspaces } = useGetWorkspaces();
  const { data: communitites } = useGetCommunities();

  const { user } = useAuth();
  const recentWorkspaces = workspaces?.slice(0, 4); // Increased to 4 since we have room now

  // You can fetch user data here to personalize the greeting
  const userName = user?.username || "User";
  const timeOfDay =
    new Date().getHours() < 12 ? "Good morning" : "Good afternoon";

  return (
    <div className="h-full w-full space-y-8">
      <Header
        title={`${timeOfDay}, ${userName}`}
        subtitle="Here's what's happening across your workspaces today."
        stats={[
          {
            title: "Active Workspaces",
            value: workspaces?.length || 0,
          },
          {
            title: "Active Communities",
            value: communitites?.length || 0,
          },
        ]}
      />

      {/* Main Layout Container: Flexbox instead of Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT COLUMN: Main Content (Fluid Width) */}
        {/* min-w-0 prevents child elements from overflowing the flex container */}
        <div className="flex-1 w-full min-w-0 space-y-8">
          <div className="border border-border rounded-xl p-4 row-end-4 md:p-6 bg-card/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Layout className="w-5 h-5 text-primary" />
                Recent Workspaces
              </h2>
              <Link
                href="/workspace"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Workspace Grid - Independent of page layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {recentWorkspaces?.map((ws: any) => (
                <WorkspaceCard key={ws.id} workspace={ws} />
              ))}

              {/* Empty State if no workspaces */}
              {(!recentWorkspaces || recentWorkspaces.length === 0) && (
                <p className="text-muted-foreground col-span-full text-center py-8">
                  No workspaces found. Create one to get started!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[400px] shrink-0 space-y-6">
          {/* Community Widget */}
          <Card className="h-[600px] flex flex-col border-border shadow-sm overflow-hidden">
            <CardContent className="p-0 flex-1 relative min-h-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <HomePosts />
                </div>
              </ScrollArea>
              {/* Fade Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </CardContent>

            <div className="p-3 border-t border-border/50 bg-muted/20 text-center">
              <Link
                href="/communities"
                className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                Explore all communities
              </Link>
            </div>
          </Card>

          {/* Pending Invitations Widget
          // {pendingInvites > 0 && (
          //   <Card className="bg-blue-50/50 dark:bg-blue-950/10 border-blue-200 dark:border-blue-900">
          //     <CardContent className="p-4 flex items-center gap-4">
          //       <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 shrink-0">
          //         <Briefcase className="w-5 h-5" />
          //       </div>
          //       <div className="flex-1 min-w-0">
          //         <p className="text-sm font-medium truncate">
          //           Workspace Invites
          //         </p>
          //         <p className="text-xs text-muted-foreground">
          //           {pendingInvites} pending invitations
          //         </p>
          //       </div>
          //       <Button size="sm" variant="outline" className="h-8 shrink-0">
          //         Review
          //       </Button>
          //     </CardContent>
          //   </Card>
          // )} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
