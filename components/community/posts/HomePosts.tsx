"use client";

import { useGetHomePosts } from "@/lib/hooks/post.hook";
import React from "react";
import PostsCard from "./PostsCard";

const HomePosts = () => {
  const { data: posts } = useGetHomePosts();
  return (
    <div>
      {posts?.length === 0 && (
        <p className="">No feeds found, join a community</p>
      )}
      {posts?.map((post: any) => (
        <PostsCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default HomePosts;
