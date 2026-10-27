import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductByIdOrSlug } from "@/utils/api";
import { toBanglaNumber, formatUnitBangla } from "@/utils/bangla";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductByIdOrSlug(slug);

  if (!product) {
    notFound();
  }

  const displayUnit = formatUnitBangla(product.unit, product.unitBn);
  const dir = product.change?.dir || "flat";
  const pct = Math.abs(product.change?.pct || 0);
  const markets = product.markets || [];
  const minPrice = markets.length > 0 
    ? Math.min(...markets.map((m: any) => m.min || product.today)) 
    : product.today - 2;
  const maxPrice = markets.length > 0 
    ? Math.max(...markets.map((m: any) => m.max || product.today)) 
    : product.today + 3;
  const avgPrice = markets.length > 0
    ? Math.round(markets.reduce((acc: number, m: any) => acc + (m.avg || m.today || product.today), 0) / markets.length)
    : product.today;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link href="/" className="hover:text-[#1E8E3E] transition">
          হোম
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link 
          href={`/category/${product.category || "chal"}`} 
          className="hover:text-[#1E8E3E] transition"
        >
          {product.categoryNameBn || product.category || "চাল"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-800 font-medium">{product.nameBn}</span>
      </nav>
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F2F5F2] flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            {product.image || "🛒"}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {product.nameBn}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {displayUnit} - {product.categoryNameBn || "চাল"}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">
              গতকালের তুলনায় আজ দাম{" "}
              {dir === "up" ? (
                <span className="text-[#DC2626] font-semibold">বেড়েছে {toBanglaNumber(pct)}%</span>
              ) : dir === "down" ? (
                <span className="text-[#15803D] font-semibold">কমেছে {toBanglaNumber(pct)}%</span>
              ) : (
                <span className="text-gray-600">পরিবর্তন হয়নি</span>
              )}
            </p>
          </div>
        </div>
        <div className="w-full md:w-auto bg-[#F8F9F8] border border-gray-200/80 rounded-2xl p-4 text-center md:text-right shrink-0">
          <p className="text-xs text-gray-500 mb-0.5">আজকের দাম</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {toBanglaNumber(product.today)}{" "}
            <span className="text-sm font-normal text-gray-600">টাকা / {displayUnit.replace("প্রতি ", "")}</span>
          </p>
          <div className="mt-1">
            {dir === "up" ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#DC2626]">
                ▲ {toBanglaNumber(pct.toFixed(1), false)}%
              </span>
            ) : dir === "down" ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803D]">
                ▼ {toBanglaNumber(pct.toFixed(1), false)}%
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500">
                — ০.০%
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <h2 className="text-lg font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Min Price */}
          <div className="bg-[#F8F9F8] border border-gray-200/60 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">সর্বনিম্ন দাম</p>
            <p className="text-xl sm:text-2xl font-bold text-[#15803D]">
              {toBanglaNumber(minPrice)} টাকা
            </p>
            <p className="text-xs text-gray-400 mt-1">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="bg-[#F8F9F8] border border-gray-200/60 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">সর্বাধিক দাম</p>
            <p className="text-xl sm:text-2xl font-bold text-[#DC2626]">
              {toBanglaNumber(maxPrice)} টাকা
            </p>
            <p className="text-xs text-gray-400 mt-1">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="bg-[#F8F9F8] border border-gray-200/60 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">গড় দাম</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {toBanglaNumber(avgPrice)} টাকা
            </p>
            <p className="text-xs text-gray-400 mt-1">{displayUnit} এর হিসাবে</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <h2 className="text-lg font-bold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs sm:text-sm text-gray-500 bg-[#FAFAFA]">
                <th className="py-3 px-4 font-medium">বাজার</th>
                <th className="py-3 px-4 font-medium">বিভাগ</th>
                <th className="py-3 px-4 font-medium">সর্বনিম্ন</th>
                <th className="py-3 px-4 font-medium">সর্বাধিক</th>
                <th className="py-3 px-4 font-medium">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {markets.length > 0 ? (
                markets.map((m: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition">
                    <td className="py-3.5 px-4 font-medium text-gray-900">
                      {m.market || "কারওয়ান বাজার"}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {m.division || "ঢাকা"}
                    </td>
                    <td className="py-3.5 px-4 text-gray-800">
                      {toBanglaNumber(m.min || product.today)} টাকা
                    </td>
                    <td className="py-3.5 px-4 text-gray-800">
                      {toBanglaNumber(m.max || product.today + 2)} টাকা
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      {toBanglaNumber(m.avg || m.today || product.today)} টাকা
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-3.5 px-4 font-medium text-gray-900">মঠ বাজার</td>
                    <td className="py-3.5 px-4 text-gray-600">ময়মনসিংহ</td>
                    <td className="py-3.5 px-4 text-gray-800">{toBanglaNumber(product.today - 2)} টাকা</td>
                    <td className="py-3.5 px-4 text-gray-800">{toBanglaNumber(product.today + 1)} টাকা</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">{toBanglaNumber(product.today)} টাকা</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-3.5 px-4 font-medium text-gray-900">সদর বাজার</td>
                    <td className="py-3.5 px-4 text-gray-600">রাজশাহী</td>
                    <td className="py-3.5 px-4 text-gray-800">{toBanglaNumber(product.today - 1)} টাকা</td>
                    <td className="py-3.5 px-4 text-gray-800">{toBanglaNumber(product.today + 2)} টাকা</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">{toBanglaNumber(product.today + 0.5)} টাকা</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-3.5 px-4 font-medium text-gray-900">কারওয়ান বাজার</td>
                    <td className="py-3.5 px-4 text-gray-600">ঢাকা</td>
                    <td className="py-3.5 px-4 text-gray-800">{toBanglaNumber(product.today - 3)} টাকা</td>
                    <td className="py-3.5 px-4 text-gray-800">{toBanglaNumber(product.today + 3)} টাকা</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">{toBanglaNumber(product.today)} টাকা</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}