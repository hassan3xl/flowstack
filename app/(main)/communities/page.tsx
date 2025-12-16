"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Settings,
  LogOut,
  MoreVertical,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useGetServers } from "@/lib/hooks/server.hooks";
import Link from "next/link";
import Loader from "@/components/Loader";
import Header from "@/components/Header";

const MyServersPage = () => {
  const { data: servers, isLoading } = useGetServers();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "owned">("all");

  const filteredServers =
    servers?.filter((server: any) => {
      const matchesSearch = server.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = filter === "all" ? true : server.role === "owner"; // Assuming API returns role
      return matchesSearch && matchesFilter;
    }) || [];

  if (isLoading) return <Loader />;

  return (
    <div className="">
      {/* Header */}
      <Header
        title="My Servers"
        subtitle="Manage and access the communities you belong to."
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-4 rounded-xl border border-border">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search your servers..."
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant={filter === "all" ? "secondary" : "ghost"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            All Servers
          </Button>
          <Button
            variant={filter === "owned" ? "secondary" : "ghost"}
            onClick={() => setFilter("owned")}
            size="sm"
          >
            Owned
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServers.map((server: any) => (
          <div
            key={server.id}
            className="group bg-card border border-border rounded-xl p-4 hover:border-blue-500/50 transition-all flex items-start gap-4 relative"
          >
            {/* Server Icon */}
            <Link href={`/server/${server.id}`} className="shrink-0">
              <Avatar className="w-16 h-16 rounded-2xl border-2 border-border group-hover:border-blue-500 transition-colors">
                <AvatarImage src={server.icon} />
                <AvatarFallback className="text-lg font-bold bg-muted">
                  {server.name[0]}
                </AvatarFallback>
              </Avatar>
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center gap-2 mb-1">
                <Link
                  href={`/server/${server.id}`}
                  className="font-bold text-lg hover:underline truncate"
                >
                  {server.name}
                </Link>
                {server.role === "owner" && (
                  <Badge
                    variant="outline"
                    className="text-[10px] border-yellow-500/50 text-yellow-500 gap-1 px-1.5 py-0"
                  >
                    <Crown className="w-3 h-3" /> Owner
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {server.members_count || 0} Members
              </p>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-3">
                <Link href={`/server/${server.id}`}>
                  <Button size="sm" variant="secondary" className="h-8 text-xs">
                    Enter
                  </Button>
                </Link>
              </div>
            </div>

            {/* Dropdown Menu */}
            <div className="absolute top-4 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `https://app.com/invite/${server.invite_code}`
                      )
                    }
                  >
                    Invite People
                  </DropdownMenuItem>
                  {server.role === "owner" ? (
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" /> Server Settings
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem className="text-red-500">
                      <LogOut className="w-4 h-4 mr-2" /> Leave Server
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}

        {filteredServers.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-xl">
            <p className="text-muted-foreground">No servers found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyServersPage;
