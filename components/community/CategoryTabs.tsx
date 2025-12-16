import React from "react";
// Assuming you have your mock data here
import { CATEGORIES } from "./mock";

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

const CategoryTabs = ({
  activeCategory,
  setActiveCategory,
}: CategoryTabsProps) => {
  return (
    <div className="w-full border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide mask-fade">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary text-primary shadow-md shadow-primary/20"
                      : "bg-[#2b2d31] text-gray-400 hover:bg-[#35373c] hover:text-gray-200"
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

export default CategoryTabs;
