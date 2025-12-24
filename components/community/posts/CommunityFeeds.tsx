"use client";

import React, { useState } from "react";

import FeedsCard from "./PostsCard";
import { useGetCommunityPosts } from "@/lib/hooks/post.hook";
import { useCommunity } from "@/contexts/CommunityContext";
import PostsCard from "./PostsCard";

export default function CommunityFeeds() {
  const { communityId } = useCommunity();
  const { data: posts } = useGetCommunityPosts(communityId);

  return (
    <div className="">
      {/* Header */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col gap-4">
          {posts?.length === 0 && (
            <p className="">No posts found, join a community</p>
          )}
          {posts?.map((post: any) => (
            <PostsCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
