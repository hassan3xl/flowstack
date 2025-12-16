"use client";

import React from "react";
import { Shield, Users, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface CommunityCardProps {
  community: any;
  onJoin?: (id: string) => void;
}

const CommunityCard = ({ community, onJoin }: CommunityCardProps) => {
  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 h-[300px] flex flex-col">
      {/* --- Banner Area --- */}
      <div className="h-28 w-full relative overflow-hidden bg-muted">
        {community.banner ? (
          <Image
            src={community.banner}
            alt="banner"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // Fallback Gradient
          <div
            className={`w-full h-full bg-gradient-to-br ${
              community.color || "from-blue-600 to-indigo-600"
            }`}
          />
        )}

        {/* Verified Badge Overlay */}
        {community.verified && (
          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1">
            <Shield className="w-3 h-3 text-green-400 fill-green-400" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              Verified
            </span>
          </div>
        )}
      </div>

      {/* --- Server Icon (Floating) --- */}
      <div className="absolute top-20 left-4">
        <div className="w-14 h-14 rounded-2xl border-4 border-card bg-background flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
          {community.icon ? (
            <Image
              src={community.icon}
              alt={community.name}
              width={56}
              height={56}
            />
          ) : (
            <div className="text-lg font-bold text-muted-foreground">
              {community.name.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* --- Card Body --- */}
      <div className="pt-8 p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-foreground truncate mb-1 pr-2">
          {community.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10 leading-relaxed">
          {community.description || "No description provided."}
        </p>

        {/* Footer Stats & Action */}
        <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium text-foreground">
                {community.online || 0}
              </span>{" "}
              Online
            </div>
            <div className="flex items-center gap-1.5 ml-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
              <span>{community.members || 0} Members</span>
            </div>
          </div>

          {/* Hidden Button that slides in or stays visible depending on preference. Here it's solid. */}
          <Button
            size="sm"
            variant="secondary"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onJoin?.(community.id);
            }}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
