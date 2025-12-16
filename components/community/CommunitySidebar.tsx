"use client";

import React from "react";
import {
  Compass,
  Sparkles,
  Trophy,
  Music,
  Monitor,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data moved closer or imported
const CATEGORIES = [
  { id: "home", name: "Home", icon: Compass },
  { id: "gaming", name: "Gaming", icon: Trophy },
  { id: "music", name: "Music", icon: Music },
  { id: "tech", name: "Technology", icon: Monitor },
  { id: "education", name: "Education", icon: GraduationCap },
];

interface CommunitySidebarProps {
  setActiveCategory: (id: string) => void;
  activeCategory: string;
}

const CommunitySidebar = ({
  setActiveCategory,
  activeCategory,
}: CommunitySidebarProps) => {
  return (
    <div className="w-64 h-full bg-card/50 backdrop-blur-xl border-r border-border hidden md:flex flex-col sticky top-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-500" />
          Discover
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Find your next favorite community.
        </p>
      </div>

      <div className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <cat.icon
                size={18}
                className={isActive ? "text-primary" : "opacity-70"}
              />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Footer / Ad area */}
      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-4">
          <h4 className="text-xs font-bold text-indigo-400 mb-1">
            Create your own
          </h4>
          <p className="text-[10px] text-muted-foreground mb-3">
            Don't see what you like? Make your own server today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunitySidebar;
