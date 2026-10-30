"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useSignOut } from "@/lib/useSignOut";

export default function UserMenu() {
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const { signingOut, handleSignOut } = useSignOut(() => setOpen(false));
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (isPending) {
    return <div className="h-9 w-28 rounded-lg bg-gray-100 animate-pulse" />;
  }

  const user = session?.user;

  if (!user) {
    return (
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
    );
  }

  const firstName = user.name?.split(" ")[0] || user.email;
  const initial = (user.name || user.email || "?").charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 px-1.5 py-1 rounded-lg hover:bg-gray-50 transition"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name || "User"}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-lg object-cover"
          />
        ) : (
          <span className="w-9 h-9 rounded-lg bg-[#1E8E3E] text-white flex items-center justify-center font-semibold">
            {initial}
          </span>
        )}
        <span className="hidden sm:inline text-sm font-semibold text-gray-800">
          {firstName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50"
        >
          <p className="font-semibold text-gray-900 truncate">{user.name}</p>
          <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>

          <div className="mt-3 flex flex-col gap-1">
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-2 py-1.5 -mx-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <User className="w-4 h-4" />
              আমার প্রোফাইল
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex items-center gap-2 px-2 py-1.5 -mx-2 rounded-lg text-sm text-[#DC2626] hover:bg-red-50 transition disabled:opacity-60 text-left"
            >
              <LogOut className="w-4 h-4" />
              {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
