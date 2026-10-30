import React from "react";
import Image from "next/image";
import TodayDate from "@/components/TodayDate";

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-6 sm:pt-8 pb-4">
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-10 md:px-12 md:py-11 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="max-w-xl text-center md:text-left flex flex-col items-center md:items-start">
          <span className="inline-block bg-[#E8F5E9] text-[#1E8E3E] text-xs sm:text-sm font-medium px-3.5 py-1 rounded-full mb-4">
            <TodayDate />
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-snug mb-3.5">
            আজকের বাজারের দাম এক নজরে
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-7">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#0E8A38] hover:bg-[#0b722e] text-white font-semibold text-sm sm:text-base shadow-[0_6px_16px_rgba(14,138,56,0.28)] hover:shadow-[0_8px_20px_rgba(14,138,56,0.38)] transition-all duration-200"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="shrink-0 flex items-center justify-center">
          <Image
            src="/images/bazar-hero.png"
            alt="আজকের বাজারের ঝুড়ি"
            width={260}
            height={210}
            priority
            className="w-48 sm:w-60 md:w-64 h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}