import React from "react";
import { CATEGORIES } from "./mock";

interface CommunitySidebarProps {
  setActiveCategory: any;
  activeCategory: any;
}

const CommunitySidebar = ({
  setActiveCategory,
  activeCategory,
}: CommunitySidebarProps) => {
  return (
    <div className="w-60 bg-card flex flex-col p-2 gap-1 flex-shrink-0">
      <h2 className="px-3 py-4 text-xl font-bold mb-2">Discover</h2>

      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.id)}
          className={`flex items-center gap-3 px-3 py-2 rounded-[4px] text-sm font-medium transition-colors
              ${
                activeCategory === cat.id
                  ? "bg-[#404249] text-white"
                  : "text-gray-400 hover:bg-[#35373c] hover:text-gray-200"
              }`}
        >
          <cat.icon size={20} />
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CommunitySidebar;
