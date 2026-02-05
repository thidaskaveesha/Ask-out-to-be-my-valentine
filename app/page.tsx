"use client";

import { useState } from "react";
import { CATEGORIES, GENDERS } from "@/lib/config";
import type { CategorySlug, GenderSlug } from "@/lib/config";

export default function HomePage() {
  const [category, setCategory] = useState<CategorySlug | null>(null);
  const [gender, setGender] = useState<GenderSlug | null>(null);
  const [partnerName, setPartnerName] = useState("");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    if (!category || !gender || !partnerName.trim()) return;
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const link = `${baseUrl}/${category}/${gender}?name=${encodeURIComponent(partnerName.trim())}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Could not copy. Please copy manually.");
    }
  };

  const reset = () => {
    setCategory(null);
    setGender(null);
    setPartnerName("");
    setGeneratedLink(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 py-12 bg-mesh">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-[#ff3366] via-[#ff6b8a] to-[#ffd93d] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
          Create Your Valentine Link
        </h1>
        <p className="text-center text-[#9ca3af] mb-8 text-sm">
          Select your partner&apos;s profile and get a special link
        </p>

        {!generatedLink ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#e5e7eb] mb-2">
                Step 1: Profession
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(Object.entries(CATEGORIES) as [CategorySlug, typeof CATEGORIES[CategorySlug]][]).map(
                  ([slug, { label }]) => (
                    <button
                      key={slug}
                      onClick={() => {
                        setCategory(slug);
                        setGender(null);
                      }}
                      className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                        category === slug
                          ? "bg-gradient-to-r from-[#ff3366] to-[#ff6b8a] text-white shadow-lg shadow-[#ff3366]/30"
                          : "glass text-[#e5e7eb] hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
            </div>

            {category && (
              <div>
                <label className="block text-sm font-medium text-[#e5e7eb] mb-2">
                  Step 2: Choose
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.entries(GENDERS) as [GenderSlug, typeof GENDERS[GenderSlug]][]).map(
                    ([slug, { label }]) => (
                      <button
                        key={slug}
                        onClick={() => setGender(slug)}
                        className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                          gender === slug
                            ? "bg-gradient-to-r from-[#ff3366] to-[#ff6b8a] text-white shadow-lg shadow-[#ff3366]/30"
                            : "glass text-[#e5e7eb] hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        {label}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {category && gender && (
              <div>
                <label className="block text-sm font-medium text-[#e5e7eb] mb-2">
                  Step 3: Partner&apos;s name
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Enter their name..."
                  className="w-full py-3 px-4 rounded-xl glass border border-white/10 text-white placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#ff3366] focus:border-transparent transition-all"
                />
              </div>
            )}

            {category && gender && partnerName.trim() && (
              <button
                onClick={generateLink}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff3366] to-[#ff6b8a] text-white font-bold text-lg shadow-lg shadow-[#ff3366]/30 hover:scale-[1.02] hover:shadow-[#ff3366]/40 transition-all duration-200"
              >
                Generate Link
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4 glass rounded-2xl p-6 border border-white/10">
            <p className="text-center text-[#e5e7eb] text-sm">
              Share this link with {partnerName}:
            </p>
            <div className="p-4 rounded-xl bg-black/20 border border-white/10 break-all text-sm text-[#f3f4f6]">
              {generatedLink}
            </div>
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
                  copied
                    ? "bg-[#22c55e] text-white"
                    : "bg-gradient-to-r from-[#ff3366] to-[#ff6b8a] text-white hover:shadow-lg hover:shadow-[#ff3366]/30"
                }`}
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={reset}
                className="px-6 py-3 rounded-xl glass text-[#e5e7eb] hover:bg-white/10 border border-white/10 transition-all"
              >
                New Link
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
