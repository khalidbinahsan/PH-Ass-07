"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, LogOut } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { useSignOut } from "@/lib/useSignOut";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { signingOut, handleSignOut } = useSignOut();
  const [name, setName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [isPending, user, router]);

  const nameValue = name ?? user?.name ?? "";

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameValue.trim();

    if (!trimmed) {
      toast.error("নাম খালি রাখা যাবে না।");
      return;
    }
    if (trimmed === user?.name) {
      toast("কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setSaving(true);
    try {
      const { error } = await authClient.updateUser({ name: trimmed });
      if (error) {
        toast.error(error.message || "আপডেট ব্যর্থ হয়েছে।");
        return;
      }
      toast.success("প্রোফাইল আপডেট হয়েছে!");
    } catch {
      toast.error("আপডেট ব্যর্থ হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#1E8E3E]" />
      </div>
    );
  }

  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto px-4 pt-12 sm:pt-16 pb-16">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name || "User"}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
          ) : (
            <span className="w-16 h-16 rounded-xl bg-[#1E8E3E] text-white flex items-center justify-center text-2xl font-semibold shrink-0">
              {initial}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-lg font-semibold text-gray-900 truncate">{user.name}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-[#DC2626] border border-red-300 rounded-xl hover:bg-red-50 transition disabled:opacity-60 cursor-pointer"
        >
          {signingOut ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogOut className="w-4 h-4" />
          )}
          সাইন আউট
        </button>
      </div>

      <div className="mt-5 bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h2 className="text-base font-bold text-gray-900 mb-4">তথ্য</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="profile-name"
              className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5"
            >
              নাম
            </label>
            <input
              id="profile-name"
              type="text"
              value={nameValue}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1E8E3E] transition"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1E8E3E] hover:bg-[#187732] disabled:opacity-60 text-white font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            আপডেট
          </button>
        </form>
      </div>
    </div>
  );
}
