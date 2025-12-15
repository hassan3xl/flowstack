import Image from "next/image";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ServerHomeMemberCardProps {
  member: any;
}

const ServerHomeMemberCard = ({ member }: ServerHomeMemberCardProps) => {
  console.log("member", member);

  return (
    <div>
      <div
        key={member.id}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer"
      >
        <Avatar className="w-20 h-20 ring-4 ring-background group-hover:ring-accent transition-all duration-500">
          <AvatarImage src={member?.user.avatar} className="object-cover" />
          <AvatarFallback className="text-lg bg-secondary">
            {member.full_name?.[0] || member.user.username?.[0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-white text-sm truncate">
            {member.user.username}
          </p>{" "}
          <p className="text-xs text-gray-400">{member.role}</p>
        </div>

        <span className="text-xs text-gray-500 whitespace-nowrap">
          {member.joinedAt}
        </span>
      </div>
    </div>
  );
};

export default ServerHomeMemberCard;
