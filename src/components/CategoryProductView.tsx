"use client";

import React, { useState, useMemo } from "react";
import ProductCard, { ProductCardProps } from "@/components/ProductCard";
import { toBanglaNumber, parseBanglaNumber } from "@/utils/bangla";
import { ChevronDown } from "lucide-react";

interface CategoryProductViewProps {
  products: ProductCardProps[];
}

type SortOption = "default" | "low-to-high" | "high-to-low";

export default function CategoryProductView({
  products,
}: CategoryProductViewProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Challenge C1: Sort accurately by numeric value (handles both English & Bengali numerals)
  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === "low-to-high") {
      return list.sort(
        (a, b) => parseBanglaNumber(a.today) - parseBanglaNumber(b.today)
      );
    }
    if (sortBy === "high-to-low") {
      return list.sort(
        (a, b) => parseBanglaNumber(b.today) - parseBanglaNumber(a.today)
      );
    }
    return list;
  }, [products, sortBy]);

  return (
    <div className="space-y-4">
      {/* Row 2: Sort Control Bar (Matches Figma white card bar) */}
      <div className="bg-white rounded-2xl border border-gray-200/80 px-5 py-3.5 flex items-center justify-end shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2.5">
          <label
            htmlFor="category-sort"
            className="text-xs sm:text-sm text-gray-500 font-medium"
          >
            সাজান
          </label>
          <div className="relative">
            <select
              id="category-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-200 hover:border-gray-300 rounded-xl pl-3.5 pr-8 py-1.5 text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:border-[#1E8E3E] cursor-pointer transition"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Count Subtitle */}
      <p className="text-xs sm:text-sm text-gray-500 pt-1">
        মোট {toBanglaNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}