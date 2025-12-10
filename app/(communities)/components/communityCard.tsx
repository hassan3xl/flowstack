import { Shield } from "lucide-react";
import React from "react";
interface CommunityCardProps {
  community: any;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  return (
    <div className="group bg-[#2b2d31] hover:bg-[#232428] rounded-lg cursor-pointer transition-all duration-200 shadow-md overflow-hidden flex flex-col h-[280px]">
      {/* Banner Image Area */}
      <div className={`h-32 ${community.bannerColor} relative`}>
        {/* Server Icon - Absolute positioned to overlap banner and body */}
        <div
          className={`absolute -bottom-5 left-4 w-10 h-10 rounded-xl border-4 border-[#2b2d31] group-hover:border-[#232428] ${community.iconColor} flex items-center justify-center`}
        >
          {/* Placeholder for actual image */}
          <span className="text-xs font-bold text-gray-800">
            {community.name.substring(0, 2).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 pt-8 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1">
          {community.verified && (
            <Shield className="w-4 h-4 text-green-500 fill-current" />
          )}
          <h3 className="font-bold text-gray-100 text-sm leading-tight">
            {community.name}
          </h3>
        </div>

        <p className="text-gray-400 text-xs line-clamp-2 mb-auto">
          {community.description}
        </p>

        {/* Footer Stats */}
        <div className="mt-4 flex items-center gap-3 text-[10px] text-gray-400 font-medium">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {community.online} Online
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
            {community.members} Members
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
