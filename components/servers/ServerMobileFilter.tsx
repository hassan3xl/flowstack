import React from "react";
import { CATEGORIES } from "../community/mock";
import { X } from "lucide-react";
interface ServerMobileFilterProps {
  activeCategory: string;
  setActiveCategory: any;
  isOpen: boolean;
  setIsOpen: any;
}

const ServerMobileFilter = ({
  activeCategory,
  setActiveCategory,
  isOpen,
  setIsOpen,
}: ServerMobileFilterProps) => {
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
export default ServerMobileFilter;
