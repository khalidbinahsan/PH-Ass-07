import React from "react";
import Hero from "@/components/Hero";
import ProductCard, { ProductCardProps } from "@/components/ProductCard";
import { toBanglaNumber } from "@/utils/bangla";

const RISERS_PRODUCTS: ProductCardProps[] = [
  { id: 1, name: "পেঁয়াজ", emoji: "🧅", unit: "প্রতি কেজি", price: "৫৪", change: "১২.৫%", trend: "up" },
  { id: 2, name: "আদা", emoji: "🫚", unit: "প্রতি কেজি", price: "৮৫", change: "৯.০%", trend: "up" },
  { id: 3, name: "বেগুন", emoji: "🍆", unit: "প্রতি কেজি", price: "৪৪", change: "৪.৮%", trend: "up" },
  { id: 4, name: "রুই মাছ", emoji: "🐟", unit: "প্রতি কেজি", price: "৪৬", change: "৪.৫%", trend: "up" },
  { id: 5, name: "ডিম", emoji: "🥚", unit: "প্রতি ডজন", price: "১৫৮", change: "৩.৯%", trend: "up" },
  { id: 6, name: "মাখন (১০০ গ্রাম)", emoji: "🧈", unit: "প্রতি পিস", price: "১৪৫", change: "৩.৬%", trend: "up" },
];

const FALLERS_PRODUCTS: ProductCardProps[] = [
  { id: 7, name: "কাঁচামরিচ", emoji: "🌶️", unit: "প্রতি কেজি", price: "৯২", change: "১২.৪%", trend: "down" },
  { id: 8, name: "রসুন", emoji: "🧄", unit: "প্রতি কেজি", price: "১২৫", change: "৭.৪%", trend: "down" },
  { id: 9, name: "আলু", emoji: "🥔", unit: "প্রতি কেজি", price: "৩০", change: "৬.২%", trend: "down" },
  { id: 10, name: "কাতলা মাছ", emoji: "🐠", unit: "প্রতি কেজি", price: "৪৩", change: "৪.৪%", trend: "down" },
  { id: 11, name: "হাঁসের মাংস", emoji: "🦆", unit: "প্রতি কেজি", price: "২৮৫", change: "৩.৪%", trend: "down" },
  { id: 12, name: "খাসির মাংস", emoji: "🍖", unit: "প্রতি কেজি", price: "১,২৯০", change: "৩.০%", trend: "down" },
];
export default function HomePage() {
  return (
    <div className="pb-16 space-y-10">
      <Hero />
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#DC2626] text-sm">▲</span>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            আজ দাম বেড়েছে
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RISERS_PRODUCTS.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#15803D] text-sm">▼</span>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            আজ দাম কমেছে
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FALLERS_PRODUCTS.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}