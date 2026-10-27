import React from "react";
import Link from "next/link";
import { getTodayBanglaDate, toBanglaNumber, formatUnitBangla } from "@/utils/bangla";
import { getAllCategories, getAllProducts } from "@/utils/api";

export default async function Navbar() {
  const [categoriesRes, productsRes] = await Promise.all([
    getAllCategories().catch(() => []),
    getAllProducts().catch(() => []),
  ]);

  const categories = Array.isArray(categoriesRes)
    ? categoriesRes
    : categoriesRes?.data || categoriesRes?.categories || [];

  const products = Array.isArray(productsRes)
    ? productsRes
    : productsRes?.data || productsRes?.products || [];
  const tickerProducts = products.slice(0, 33);

  const user = null; 

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-[#1E8E3E] flex items-center justify-center text-white text-xl shadow-sm group-hover:bg-[#187732] transition">
            🛒
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              বাজার দর
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {getTodayBanglaDate()}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-800">প্রোফাইল</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:text-[#1E8E3E] border border-gray-300 rounded-lg hover:border-[#1E8E3E] transition"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-3.5 py-1.5 text-sm font-medium text-white bg-[#1E8E3E] hover:bg-[#187732] rounded-lg transition shadow-xs"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>
      <nav className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex items-center justify-start sm:justify-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar py-2.5">
            {categories.map((cat: any) => (
              <li key={cat.id || cat.slug} className="shrink-0">
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
                >
                  <span className="text-base">{cat.icon || cat.emoji || "📦"}</span>
                  <span>{cat.nameBn || cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="border-t border-gray-200 bg-[#FAFAFA] overflow-hidden py-2 relative">
        <style>{`
          @keyframes ticker-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: ticker-scroll 200s linear infinite;
          }
          .ticker-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="ticker-track flex flex-row items-center w-max">
          {[...tickerProducts, ...tickerProducts, ...tickerProducts].map((item: any, idx: number) => {
            const dir = item.change?.dir || "flat";
            const pct = Math.abs(item.change?.pct || 0);
            const displayUnit = formatUnitBangla(item.unit, item.unitBn);

            return (
              <div
                key={`${item.id}-${idx}`}
                className="flex items-center gap-2 px-5 border-r border-gray-200 text-xs sm:text-sm whitespace-nowrap shrink-0"
              >
                <span>{item.image || "🛒"}</span>
                <span className="font-semibold text-gray-800">{item.nameBn}</span>
                <span className="text-gray-500">
                  {toBanglaNumber(item.today)} টাকা/{displayUnit.replace("প্রতি ", "")}
                </span>
                {dir === "up" ? (
                  <span className="text-[#DC2626] font-semibold flex items-center gap-0.5">
                    ▲ {toBanglaNumber(pct.toFixed(1), false)}%
                  </span>
                ) : dir === "down" ? (
                  <span className="text-[#15803D] font-semibold flex items-center gap-0.5">
                    ▼ {toBanglaNumber(pct.toFixed(1), false)}%
                  </span>
                ) : (
                  <span className="text-gray-500 font-medium">
                    — {toBanglaNumber(pct.toFixed(1), false)}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}