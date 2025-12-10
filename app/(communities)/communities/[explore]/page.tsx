"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, COMMUNITIES } from "../../components/mock";
import CommunitySidebar from "../../components/CommunitySidebar";
import CommunityCard from "../../components/communityCard";

// 3. Main Component
const ExploreCommunities = () => {
  const [activeCategory, setActiveCategory] = useState("home");

  // Filter logic (If home, show all, else filter by category)
  const filteredCommunities =
    activeCategory === "home"
      ? COMMUNITIES
      : COMMUNITIES.filter((c) => c.category === activeCategory);

  return (
    <div className="flex h-screen font-sans">
      <CommunitySidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* --- Main Content Area --- */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero / Search Section */}
        <div className="relative h-64 bg-accent flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl md:text-4xl font-extrabold mb-2 text-primary">
            Find your community on Flowstack
          </h1>
          <p className="text-accent-foreground mb-6 max-w-lg text-sm md:text-base">
            From gaming, to music, to learning, there's a place for you.
          </p>

          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Explore communities..."
              className="w-full py-3 pl-4 pr-10 rounded-[4px] text-accent-foregroundfocus:outline-none"
            />
            <Search
              className="absolute right-3 top-3 text-accent-foreground"
              size={20}
            />
          </div>
        </div>

        {/* Communities Grid */}
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <h2 className="text-xl font-bold mb-4 capitalize">
            {activeCategory === "home"
              ? "Featured Communities"
              : `${activeCategory} Servers`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>

          {filteredCommunities.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No communities found in this category yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreCommunities;
