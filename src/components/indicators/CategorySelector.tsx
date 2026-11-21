import React from 'react';
import { IndicatorCategory } from '../../types';

interface CategorySelectorProps {
  categories: IndicatorCategory[];
  activeCategory: IndicatorCategory;
  onSelectCategory: (category: IndicatorCategory) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="border-b border-border-subtle overflow-x-auto pb-1" aria-label="Environmental Indicator Categories">
      <div className="flex items-center gap-2 pb-1 min-w-max">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelectCategory(category)}
              className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-accent-cyan ${
                isActive
                  ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/40 shadow-sm font-semibold'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated border border-transparent'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};
