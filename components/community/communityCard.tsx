"use client";

import React from "react";
import {
  Crown,
  MoreVertical,
  Settings,
  LogOut,
  Users,
  Globe,
  Lock,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const CommunityCard = ({ community }: { community: any }) => {
  const isOwner = community.is_owner;

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-500/40 transition-all duration-300">
      {/* Decorative Top Bar based on Visibility */}
      <div
        className={`h-1.5 w-full ${
          community.visibility === "public" ? "bg-green-500" : "bg-slate-500"
        }`}
      />

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <Link href={`/communities/${community.id}`}>
            <Avatar className="w-16 h-16 rounded-2xl border-2 border-background shadow-md group-hover:scale-105 transition-transform">
              <AvatarImage src={community.icon} alt={community.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xl">
                {community.name[0]}
              </AvatarFallback>
            </Avatar>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {isOwner ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href={`/communities/${community.id}/settings`}>
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              ) : (
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" /> Leave Community
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg truncate">{community.name}</h3>
            {isOwner && (
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-1.5 h-5 text-[10px] font-bold">
                OWNER
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {community.category_name || "General"}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px] mt-2">
            {community.description || "No description provided."}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {community.member_count || 0}
            </div>
            <div className="flex items-center gap-1">
              {community.visibility === "public" ? (
                <Globe className="w-3.5 h-3.5" />
              ) : (
                <Lock className="w-3.5 h-3.5" />
              )}
              <span className="capitalize">{community.visibility}</span>
            </div>
          </div>

          <Button
            asChild
            size="sm"
            variant="secondary"
            className="rounded-lg px-4 h-8 text-xs font-bold"
          >
            <Link href={`/communities/${community.id}`}>View</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
