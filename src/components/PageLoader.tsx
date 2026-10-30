import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 flex justify-center">
      <Loader2 className="w-7 h-7 animate-spin text-[#1E8E3E]" />
    </div>
  );
}
