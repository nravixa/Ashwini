import React from "react";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  className = "",
}: CategoryTabsProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-4 md:gap-8 ${className}`}>
      {categories.map((category) => {
        const active = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`relative px-6 py-2 font-sans text-xs md:text-sm uppercase tracking-widest transition-colors font-medium cursor-pointer ${
              active
                ? "text-tertiary font-bold"
                : "text-white/70 hover:text-white"
            }`}
          >
            {category}
            {active && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-tertiary"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
