"use client";

import React, { useState } from "react";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetFeed, useGetServerFeeds } from "@/lib/hooks/feed.hook";
import { FeedType } from "@/lib/types/feed.types";
import FeedsCard from "@/components/chats/FeedsCard";
import { useServer } from "@/contexts/ServerContext";

interface ServerFeedsProps {}

export default function ServerFeeds({}: ServerFeedsProps) {
  const { serverId } = useServer();
  const { data: feeds } = useGetServerFeeds(serverId);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto ">
        <div className="flex flex-col gap-4">
          {feeds?.map((post: any) => (
            <FeedsCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
