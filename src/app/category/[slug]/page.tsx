import React from "react";
import Link from "next/link";
import { getCategoryBySlug, getProductsByCategory } from "@/utils/api";
import { toBanglaNumber } from "@/utils/bangla";
import CategoryProductView from "@/components/CategoryProductView";
import { ProductCardProps } from "@/components/ProductCard";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [categoryRes, productsRes] = await Promise.all([
    getCategoryBySlug(slug).catch(() => null),
    getProductsByCategory(slug).catch(() => []),
  ]);

  const category = categoryRes?.data || categoryRes?.category || categoryRes;
  const products: ProductCardProps[] = Array.isArray(productsRes)
    ? productsRes
    : productsRes?.data || productsRes?.products || [];

  if (!category && products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border border-gray-200/80 p-10 sm:p-14 text-center max-w-lg mx-auto shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-3xl mx-auto mb-4">
            🔍
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            কোনো পণ্য পাওয়া যায়নি (৪০৪)
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            দুঃখিত, এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই অথবা ভুল লিংকে প্রবেশ করা হয়েছে।
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#1E8E3E] hover:bg-[#187732] text-white font-semibold text-sm transition shadow-xs"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }
  const categoryName =
    category?.nameBn ||
    category?.name ||
    products[0]?.categoryNameBn ||
    slug;
  const categoryIcon =
    category?.icon ||
    category?.emoji ||
    products[0]?.categoryIcon ||
    products[0]?.image ||
    "🍚";

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-4">
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 flex items-center gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#F2F5F2] flex items-center justify-center text-2xl sm:text-3xl shrink-0">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            {categoryName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {toBanglaNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <CategoryProductView products={products} />
    </div>
  );
}