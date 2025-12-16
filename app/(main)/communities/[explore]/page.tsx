"use client";

import React, { useState } from "react";
import {
  Search,
  X,
  Filter,
  Home,
  Gamepad2,
  Music,
  Palette,
  BookOpen,
  Zap,
  Users,
  Radio,
  Plus,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- MOCK DATA ---
const CATEGORIES = [
  { id: "home", name: "Home", icon: Home },
  { id: "gaming", name: "Gaming", icon: Gamepad2 },
  { id: "music", name: "Music", icon: Music },
  { id: "art", name: "Creative", icon: Palette },
  { id: "education", name: "Education", icon: BookOpen },
  { id: "tech", name: "Tech", icon: Zap },
];

const COMMUNITIES = [
  {
    id: 1,
    name: "Gamer's Paradise",
    category: "gaming",
    members: "15.2k",
    online: 3200,
    bannerColor: "bg-blue-900",
    iconColor: "bg-blue-600",
    description:
      "The ultimate hub for competitive gaming and esports discussion.",
    verified: true,
  },
  {
    id: 2,
    name: "Midnight Jazz",
    category: "music",
    members: "8.5k",
    online: 450,
    bannerColor: "bg-orange-900",
    iconColor: "bg-orange-600",
    description:
      "A chill space for jazz enthusiasts to share tunes and theory.",
    verified: false,
  },
  {
    id: 3,
    name: "Digital Architects",
    category: "art",
    members: "24k",
    online: 2100,
    bannerColor: "bg-purple-900",
    iconColor: "bg-purple-600",
    description: "Showcase your 3D models, UI designs, and digital art.",
    verified: true,
  },
  {
    id: 4,
    name: "Rust Developers",
    category: "tech",
    members: "12k",
    online: 1800,
    bannerColor: "bg-stone-900",
    iconColor: "bg-stone-600",
    description: "The official gathering place for Rustaceans.",
    verified: false,
  },
  {
    id: 5,
    name: "Indie Game Dev",
    category: "gaming",
    members: "9.5k",
    online: 1800,
    bannerColor: "bg-emerald-900",
    iconColor: "bg-emerald-600",
    description: "Share your progress on your latest indie game project.",
    verified: false,
  },
  {
    id: 6,
    name: "Frontend Masters",
    category: "education",
    members: "32k",
    online: 4500,
    bannerColor: "bg-indigo-900",
    iconColor: "bg-indigo-600",
    description: "Learn React, Vue, and Svelte with community experts.",
    verified: true,
  },
];

const CommunityCard = ({ community }: { community: any }) => {
  return (
    <div className="group relative flex flex-col h-[280px] rounded-xl border border-border bg-card overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 cursor-pointer">
      {/* Banner */}
      <div
        className={`h-28 w-full relative ${community.bannerColor} opacity-80 group-hover:opacity-100 transition-opacity`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 pt-0">
        <div className="relative -mt-10 mb-3">
          <div
            className={`w-16 h-16 rounded-2xl ${community.iconColor} border-4 border-zinc-900 shadow-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-300`}
          >
            {community.name.substring(0, 2).toUpperCase()}
          </div>
          {community.verified && (
            <div className="absolute bottom-0 right-0 bg-zinc-900 rounded-full p-1">
              <div className="bg-blue-500 rounded-full p-0.5">
                <Check size={10} className="text-white" strokeWidth={4} />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-zinc-100 text-lg leading-tight mb-2 group-hover:text-white">
            {community.name}
          </h3>
          <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
            {community.description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-4 text-xs font-medium text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Users size={14} />
            <span>{community.members}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Radio
              size={14}
              className={
                community.online > 1000 ? "text-green-500" : "text-zinc-500"
              }
            />
            <span className={community.online > 1000 ? "text-zinc-300" : ""}>
              {community.online} Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Category Ribbon (Desktop)
const CategoryTabs = ({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}) => {
  return (
    <div className="hidden md:block sticky top-0 z-30 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                  ${
                    isActive
                      ? "bg-zinc-100 text-zinc-900 border-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                      : "bg-transparent text-zinc-400 border-transparent hover:bg-zinc-900 hover:text-zinc-200"
                  }
                `}
              >
                <cat.icon size={16} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 4. Mobile Filter Modal
const MobileFilter = ({
  activeCategory,
  setActiveCategory,
  isOpen,
  setIsOpen,
}: {
  activeCategory: string;
  setActiveCategory: any;
  isOpen: boolean;
  setIsOpen: any;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />
      {/* Drawer */}
      <div className="absolute inset-x-0 bottom-0 bg-zinc-900 border-t border-zinc-800 rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            Filter Categories
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-zinc-800 rounded-full text-zinc-400"
          >
            <X size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 pb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              <cat.icon size={18} />
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

const ExploreCommunities = () => {
  const [activeCategory, setActiveCategory] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredCommunities = COMMUNITIES.filter((c) => {
    const matchesCategory =
      activeCategory === "home" || c.category === activeCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative bg-background overflow-x-hidden">
      {/* Mobile Filter Trigger Button (Floating) */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-full shadow-lg shadow-white/10 font-medium hover:scale-105 transition-transform"
        >
          <Filter size={18} />
          <span className="text-sm">Filter</span>
          {activeCategory !== "home" && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-[10px]">
              1
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilter
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Hero Section */}
      <div className="relative border-b border-zinc-800 bg-zinc-900/20">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center text-center">
          <Badge className="mb-6 px-3 py-1 text-sm border-zinc-700 bg-zinc-800/50 text-zinc-300">
            ✨ Discover new places
          </Badge>

          <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Find your community.
          </h1>
          <p className="text-base md:text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed">
            From gaming to technology, explore thousands of active communities
            and find where you belong.
          </p>

          {/* Search Input */}
          <div className="relative w-full max-w-xl group px-2">
            <div className="absolute inset-0 bg-zinc-800/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center">
              <Search
                className="absolute left-4 text-zinc-500 group-focus-within:text-zinc-200 transition-colors"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search servers..."
                className="w-full bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-full py-3 md:py-4 pl-12 pr-12 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-4 focus:ring-zinc-800/50 transition-all shadow-lg text-sm md:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 p-1 hover:bg-zinc-800 rounded-full text-zinc-500 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Tabs (Hidden on Mobile to use Filter Button instead) */}
      <CategoryTabs
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Grid Content */}
      <main className=" py-8 md:py-10 pb-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            {/* Active Category Display (Mobile Only) */}
            <div className="md:hidden">
              {activeCategory !== "home" && (
                <span className="text-xs font-bold bg-white text-black px-2 py-1 rounded mr-2">
                  {CATEGORIES.find((c) => c.id === activeCategory)?.name}
                </span>
              )}
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-white flex items-center gap-2">
              {activeCategory === "home"
                ? "Featured Communities"
                : `${
                    CATEGORIES.find((c) => c.id === activeCategory)?.name
                  } Servers`}
              <span className="text-sm font-normal text-zinc-500 ml-2">
                ({filteredCommunities.length})
              </span>
            </h2>
          </div>

          <button className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            <Plus size={16} />
            Create your own
          </button>
        </div>

        {filteredCommunities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-zinc-900 rounded-3xl bg-zinc-900/20 mx-4 md:mx-0">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-zinc-600" />
            </div>
            <h3 className="text-lg font-medium text-white mb-1">
              No results found
            </h3>
            <p className="text-zinc-500 max-w-xs mb-6 text-sm">
              We couldn't find any communities matching "{searchQuery}" in this
              category.
            </p>
            <button
              onClick={() => {
                setActiveCategory("home");
                setSearchQuery("");
              }}
              className="text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 px-6 py-2.5 rounded-lg transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExploreCommunities;
