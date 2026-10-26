"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getTodayBanglaDate } from "@/utils/bangla";
import { ChevronDown, User, LogOut } from "lucide-react";

// Mock categories matching your screenshot (Replace with API data later)
const CATEGORIES = [
  { id: "chal", name: "চাল", emoji: "🍚", slug: "chal" },
  { id: "dal", name: "ডাল", emoji: "🫘", slug: "dal" },
  { id: "tel", name: "তেল", emoji: "🛢️", slug: "tel" },
  { id: "sobji", name: "সবজি", emoji: "🥬", slug: "sobji" },
  { id: "mach", name: "মাছ", emoji: "🐟", slug: "mach" },
  { id: "mangsho", name: "মাংস", emoji: "🍗", slug: "mangsho" },
  { id: "dim-dudh", name: "ডিম-দুধ", emoji: "🥛", slug: "dim-dudh" },
  { id: "moshla", name: "মসলা", emoji: "🌶️", slug: "moshla" },
];

// Mock ticker items matching your screenshot (Replace with API data later)
const TICKER_ITEMS = [
  { emoji: "🍚", name: "স্বর্ণমাছি চাল", price: "১৪৮", unit: "কেজি", change: "২.১%", trend: "up" },
  { emoji: "🍚", name: "মিনিকেট চাল", price: "৯৯", unit: "কেজি", change: "২.৯%", trend: "down" },
  { emoji: "🍚", name: "বাটাম সাইজ চাল", price: "৬৬", unit: "কেজি", change: "৩.১%", trend: "up" },
  { emoji: "🫘", name: "মসুর ডাল", price: "১৪২", unit: "কেজি", change: "২.৯%", trend: "up" },
  { emoji: "🫘", name: "ছোলা", price: "১২০", unit: "কেজি", change: "২.৪%", trend: "down" },
  { emoji: "🫘", name: "আমন ডাল (খোসাসহ)", price: "১১০", unit: "কেজি", change: "১.৫%", trend: "up" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<{ name: string; image?: string } | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 py-1.5 px-2.5 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                <img
                  src={user.image || "https://i.pravatar.cc/100?img=11"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
                <span className="text-sm font-medium text-gray-800">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={() => {
                      setUser(null);
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    সাইন আউট
                  </button>
                </div>
              )}
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
            {CATEGORIES.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <li key={cat.id} className="shrink-0">
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? "bg-green-50 text-[#1E8E3E] font-semibold ring-1 ring-[#1E8E3E]/30"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span className="text-base">{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Marquee Row */}
      <div className="border-t border-gray-200 bg-[#FAFAFA] overflow-hidden py-2 relative">
        <style>{`
          @keyframes ticker-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: ticker-scroll 28s linear infinite;
          }
          .ticker-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="ticker-track flex flex-row items-center w-max">
          {/* Render list 3 times side-by-side so wide monitors never see a gap */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-5 border-r border-gray-200 text-xs sm:text-sm whitespace-nowrap shrink-0"
            >
              <span>{item.emoji}</span>
              <span className="font-semibold text-gray-800">{item.name}</span>
              <span className="text-gray-500">
                {item.price} টাকা/{item.unit}
              </span>
              {item.trend === "up" ? (
                <span className="text-red-600 font-semibold flex items-center gap-0.5">
                  ▲ {item.change}
                </span>
              ) : item.trend === "down" ? (
                <span className="text-[#1E8E3E] font-semibold flex items-center gap-0.5">
                  ▼ {item.change}
                </span>
              ) : (
                <span className="text-gray-500 font-medium">
                  — {item.change}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}