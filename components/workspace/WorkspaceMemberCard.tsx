import React from "react";
import { Shield, User, CalendarDays, Mail, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns"; // Optional: for nicer date formatting

interface WorkspaceMemberCardProps {
  member: any; // Type this properly with your Prisma/DB types later
}

const WorkspaceMemberCard = ({ member }: WorkspaceMemberCardProps) => {
  // Helper to determine badge color based on role
  const getRoleStyle = (role: string) => {
    const r = role.toLowerCase();
    if (r === "admin" || r === "owner")
      return "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border-rose-500/20";
    if (r === "moderator")
      return "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 border-indigo-500/20";
    return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20 border-slate-500/20";
  };

  const roleIcon = (role: string) => {
    const r = role.toLowerCase();
    if (r === "admin" || r === "owner")
      return <Shield className="w-3 h-3 mr-1" />;
    return <User className="w-3 h-3 mr-1" />;
  };

  return (
    <div className="group relative bg-card hover:bg-gradient-to-br hover:from-card hover:to-accent/50 border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Top Actions (Absolute positioned) */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              Kick Member
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col items-center text-center">
        {/* Avatar with Ring */}
        <div className="relative mb-4">
          <Avatar className="w-20 h-20 ring-4 ring-background group-hover:ring-accent transition-all duration-500">
            <AvatarImage src={member?.user.avatar} className="object-cover" />
            <AvatarFallback className="text-lg bg-secondary">
              {member.full_name?.[0] || member.user.username?.[0]}
            </AvatarFallback>
          </Avatar>
          {/* Online Status Dot (Optional mock) */}
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></span>
        </div>

        {/* Name & Identity */}
        <div className="space-y-1 mb-4">
          <h3 className="font-bold text-lg text-foreground truncate max-w-[200px]">
            {member.full_name || member.user.username}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">
            @{member.user.username}
          </p>
        </div>

        {/* Role Badge */}
        <Badge
          variant="outline"
          className={`mb-6 px-3 py-1 ${getRoleStyle(
            member.role
          )} transition-colors`}
        >
          {roleIcon(member.role)}
          {member.role}
        </Badge>

        {/* Footer Meta Info */}
        <div className="w-full pt-4 border-t border-border/50 flex flex-col gap-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-3 h-3" />
            <span className="truncate max-w-[180px]">{member.user.email}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CalendarDays className="w-3 h-3" />
            <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceMemberCard;
