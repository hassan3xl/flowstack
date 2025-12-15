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
import { useGetFeed } from "@/lib/hooks/feed.hook";
import FeedsCard from "./FeedsCard";
import { FeedType } from "@/lib/types/feed.types";

export default function CommunityFeeds() {
  const { data: feeds } = useGetFeed();

  return (
    <div className="">
      {/* Header */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col gap-4">
          {feeds?.length === 0 && (
            <p className="">No feeds found, join a community</p>
          )}
          {feeds?.map((post: any) => (
            <FeedsCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
