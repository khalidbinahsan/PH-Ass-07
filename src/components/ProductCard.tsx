import React from "react";
import Link from "next/link";
import { toBanglaNumber } from "@/utils/bangla";

export interface ProductCardProps {
  id: string | number;
  slug?: string;
  name: string;
  emoji: string;
  unit: string;
  price: number | string;
  change: number | string;
  trend?: "up" | "down" | "flat";
}

export default function ProductCard({
  id,
  slug,
  name,
  emoji,
  unit,
  price,
  change,
  trend,
}: ProductCardProps) {
  const numericChange =
    typeof change === "number" ? change : parseFloat(String(change));
  const resolvedTrend =
    trend ||
    (numericChange > 0 ? "up" : numericChange < 0 ? "down" : "flat");

  const formattedChange = String(change).includes("%")
    ? String(change)
    : `${toBanglaNumber(Math.abs(numericChange || 0).toFixed(1), false)}%`;

  const formattedUnit = unit.startsWith("প্রতি") ? unit : `প্রতি ${unit}`;

  return (
    <Link
      href={`/product/${slug || id}`}
      className="group block bg-white rounded-2xl border border-gray-200/80 p-5 hover:border-[#1E8E3E]/40 hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-200"
    >
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-12 h-12 rounded-xl bg-[#F2F5F2] flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
          {emoji}
        </div>
        <div>
          <h3 className="text-base sm:text-[17px] font-bold text-gray-900 group-hover:text-[#1E8E3E] transition-colors leading-snug">
            {name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{formattedUnit}</p>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">আজকের দাম</p>
          <p className="text-xl sm:text-[22px] font-bold text-gray-900 leading-none">
            {toBanglaNumber(price)}{" "}
            <span className="text-sm font-medium text-gray-700">টাকা</span>
          </p>
        </div>
        {resolvedTrend === "up" ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F3F4F3] text-[#DC2626]">
            ▲ {formattedChange}
          </span>
        ) : resolvedTrend === "down" ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F0F7F2] text-[#15803D]">
            ▼ {formattedChange}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F3F4F3] text-gray-600">
            — {formattedChange}
          </span>
        )}
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/70 p-5 animate-pulse">
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-100 rounded w-1/3" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-100 rounded w-14" />
          <div className="h-6 bg-gray-200 rounded w-20" />
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-16" />
      </div>
    </div>
  );
}