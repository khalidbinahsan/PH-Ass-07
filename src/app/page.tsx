import React from "react";
import Hero from "@/components/Hero";
import ProductCard, { ProductCardProps } from "@/components/ProductCard";
import { toBanglaNumber } from "@/utils/bangla";
import { getAllProducts } from '@/utils/api'
export default async function HomePage() {
  const response = await getAllProducts();
  const allProducts: ProductCardProps[] = Array.isArray(response)
    ? response
    : response?.data || response?.products || [];

  const raiserProducts = allProducts.filter((product) => {
   return product.change.dir === 'up';
  }).slice(0, 6);
  const downProducts = allProducts.filter((product) => {
   return product.change.dir === 'down';
  }).slice(0, 6);
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
          {raiserProducts.length > 0 ? (
            raiserProducts.slice(0, 6).map((item) => (
              <ProductCard key={item.id} {...item} />
            ))
          ) : (
            <p className="text-sm text-gray-500 col-span-full">কোনো তথ্য পাওয়া যায়নি</p>
          )}
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
          {downProducts.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="max-w-6xl mx-auto px-4 scroll-mt-36">
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            মোট {toBanglaNumber(33)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allProducts.map((item, idx) => (
            <ProductCard key={`${item.id}-${idx}`} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}