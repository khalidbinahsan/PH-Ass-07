import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-gray-600 text-center sm:text-left">
        <p className="font-medium text-gray-700">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-gray-700">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}