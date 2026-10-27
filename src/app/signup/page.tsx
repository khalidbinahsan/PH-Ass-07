"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { signUp, signIn } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      const msg = "অনুগ্রহ করে সকল ঘর পূরণ করুন।";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    if (password.length < 8) {
      const msg = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (error) {
        const msg = error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
        setErrorMsg(msg);
        toast.error(msg);
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      const msg = err?.message || "সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      setLoading(true);
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });
      if (error) {
        toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে।");
        setLoading(false);
      }
    } catch {
      toast.error("সোশ্যাল লগইন ব্যর্থ হয়েছে।");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 flex flex-col items-center justify-center">
      {/* Top Heading & Subtitle */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          সাইন আপ
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে নতুন অ্যাকাউন্ট খুলুন।
        </p>
      </div>

      {/* Main White Card */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              নাম
            </label>
            <input
              type="text"
              placeholder="আপনার নাম"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1E8E3E] transition"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              ইমেইল
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1E8E3E] transition"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1E8E3E] transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1E8E3E] hover:bg-[#187732] disabled:opacity-60 text-white font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            সাইন আপ
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-gray-400">অথবা</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-medium text-gray-700 transition cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-medium text-gray-700 transition cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-gray-900 shrink-0" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Bottom Switch Link */}
        <p className="text-center text-xs text-gray-500 mt-5">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="text-[#1E8E3E] font-semibold hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="mt-6 text-xs text-gray-500 hover:text-gray-800 transition flex items-center gap-1"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}