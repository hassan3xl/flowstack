"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Filter, Users, Radio, Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  useGetPublicCommuities,
  useGetCommuitiesCateories,
} from "@/lib/hooks/community.hooks";
import ServerMobileFilter from "@/components/servers/ServerMobileFilter";

const CommunityCard = ({ community }: { community: any }) => {
  const router = useRouter();

  return (
    <div className="group relative flex flex-col h-[280px] rounded-xl border border-border bg-card overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 cursor-pointer">
      {/* Banner */}
      <div
        className={`h-28 w-full relative ${
          community.bannerColor || "bg-zinc-800"
        } opacity-80 group-hover:opacity-100 transition-opacity`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 pt-0">
        <div className="relative -mt-10 mb-3">
          <div
            className={`w-16 h-16 rounded-2xl ${
              community.iconColor || "bg-zinc-700"
            } border-4 border-zinc-900 shadow-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-300`}
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
            <span>{community.member_count}</span>
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

        {/* Join Button */}
        <button
          onClick={() =>
            router.push(`/communities/join/${community.invite_code}`)
          }
          className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Join
        </button>
      </div>
    </div>
  );
};

// Desktop Tabs
const CategoryTabs = ({
  categories,
  activeCategory,
  setActiveCategory,
}: {
  categories: any[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}) => (
  <div className="hidden md:block sticky top-0 z-30 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
        {categories?.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                isActive
                  ? "bg-zinc-100 text-zinc-900 border-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  : "bg-transparent text-zinc-400 border-transparent hover:bg-zinc-900 hover:text-zinc-200"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

const ExploreCommunities = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: categories = [] } = useGetCommuitiesCateories();
  const { data: publicServers = [] } = useGetPublicCommuities();

  const filteredCommunities = publicServers;

  return (
    <div className="relative bg-background overflow-x-hidden">
      {/* Mobile Filter Trigger Button */}
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
      <ServerMobileFilter
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

      {/* Desktop Tabs */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Grid Content */}
      <main className="py-8 md:py-10 pb-24">
        {filteredCommunities?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredCommunities.map((community: any) => (
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
