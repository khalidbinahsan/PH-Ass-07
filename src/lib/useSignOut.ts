"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";

export function useSignOut(onSuccess?: () => void) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      const { error } = await signOut();
      if (error) {
        toast.error(error.message || "সাইন আউট ব্যর্থ হয়েছে।");
        return;
      }
      onSuccess?.();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  };

  return { signingOut, handleSignOut };
}
