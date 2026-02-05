"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useState, Suspense } from "react";
import Image from "next/image";
import { IMAGE_MAP } from "@/lib/config";
import type { CategorySlug, GenderSlug } from "@/lib/config";

const VALID_CATEGORIES: CategorySlug[] = ["doctor", "electronic-engineer"];
const VALID_GENDERS: GenderSlug[] = ["boy", "girl"];

const SAD_CAT_IMAGES = [
  "/sad-cats/sad-cat-1.png",
  "/sad-cats/sad-cat-2.png",
  "/sad-cats/sad-cat-3.png",
  "/sad-cats/sad-cat-4.png",
];

const SUCCESS_GIFS = [
  "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif",
  "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
  "https://media.giphy.com/media/3o7TKsQ8MJHyTASOry/giphy.gif",
  "https://media.giphy.com/media/11sBLVxN7ez61y/giphy.gif",
];

function PartnerPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const category = params?.category as string;
  const gender = params?.gender as string;
  const partnerName = searchParams?.get("name") || "my love";

  const [saidYes, setSaidYes] = useState(false);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [showSadCats, setShowSadCats] = useState(false);
  const [yesClicking, setYesClicking] = useState(false);

  const isValid =
    VALID_CATEGORIES.includes(category as CategorySlug) &&
    VALID_GENDERS.includes(gender as GenderSlug);

  const images = isValid
    ? IMAGE_MAP[category as CategorySlug][gender as GenderSlug]
    : [];
  const mainImage = images[0] || "/sources/doctor/girl/girl-doc.png";

  const handleNoClick = useCallback(() => {
    setShowSadCats(true);
    setTimeout(() => setShowSadCats(false), 1200);

    // Move No button to random position but KEEP IT ON SCREEN
    if (typeof window === "undefined") return;
    const btnWidth = 100;
    const btnHeight = 52;
    const padding = 20;
    const maxX = Math.max(0, window.innerWidth - btnWidth - padding * 2);
    const maxY = Math.max(0, window.innerHeight - btnHeight - padding * 2);
    const x = padding + Math.random() * maxX;
    const y = padding + Math.random() * maxY;
    setNoPosition({ x, y });
  }, []);

  const handleYesClick = () => {
    setYesClicking(true);
    setTimeout(() => {
      setSaidYes(true);
      setYesClicking(false);
    }, 200);
  };

  const successGif =
    SUCCESS_GIFS[Math.floor(Math.random() * SUCCESS_GIFS.length)];

  if (!isValid) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-mesh">
        <p className="text-[#9ca3af] text-center">Invalid link.</p>
        <a href="/" className="mt-4 text-[#ff3366] hover:underline">
          Go home
        </a>
      </main>
    );
  }

  if (saidYes) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-mesh overflow-hidden">
        <div className="animate-bounce-in text-center max-w-sm w-full">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#ff3366] via-[#ff6b8a] to-[#ffd93d] bg-clip-text text-transparent mb-3">
            I knew it! Love you!!!!
          </h2>
          <p className="text-xl text-[#ffd93d] mb-6 font-medium">
            {partnerName} 💕
          </p>
          <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 animate-pulse-glow">
            <img
              src={successGif}
              alt="Celebration"
              className="w-full h-auto aspect-square object-cover"
              unoptimized
            />
          </div>
          <p className="mt-6 text-[#9ca3af] text-sm">
            You made my day! Happy Valentine&apos;s Day! 💖
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 py-12 bg-mesh relative overflow-hidden">
      {/* Sad cat faces from corners */}
      {showSadCats && (
        <>
          <div className="fixed top-4 left-4 z-20 w-16 h-16 md:w-20 md:h-20 animate-slide-tl pointer-events-none">
            <img
              src={SAD_CAT_IMAGES[0]}
              alt=""
              className="w-full h-full object-contain drop-shadow-lg"
              unoptimized
            />
          </div>
          <div className="fixed top-4 right-4 z-20 w-16 h-16 md:w-20 md:h-20 animate-slide-tr pointer-events-none">
            <img
              src={SAD_CAT_IMAGES[1]}
              alt=""
              className="w-full h-full object-contain drop-shadow-lg"
              unoptimized
            />
          </div>
          <div className="fixed bottom-4 left-4 z-20 w-16 h-16 md:w-20 md:h-20 animate-slide-bl pointer-events-none">
            <img
              src={SAD_CAT_IMAGES[2]}
              alt=""
              className="w-full h-full object-contain drop-shadow-lg"
              unoptimized
            />
          </div>
          <div className="fixed bottom-4 right-4 z-20 w-16 h-16 md:w-20 md:h-20 animate-slide-br pointer-events-none">
            <img
              src={SAD_CAT_IMAGES[3]}
              alt=""
              className="w-full h-full object-contain drop-shadow-lg"
              unoptimized
            />
          </div>
          <div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
            <p className="text-lg md:text-xl text-[#ff6b8a] animate-fade-in font-semibold bg-black/30 px-4 py-2 rounded-xl">
              Please say yes...
            </p>
          </div>
        </>
      )}

      <div className="text-center max-w-sm w-full relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
          {partnerName} 💝
        </h1>
        <p className="text-[#9ca3af] mb-6 text-base">
          Will you be my Valentine?
        </p>

        {/* Partner image - modern sizing */}
        <div className="relative rounded-2xl overflow-hidden mb-8 w-full max-w-[320px] aspect-square mx-auto glass border border-white/10 shadow-xl animate-float">
          <Image
            src={mainImage}
            alt="Valentine"
            fill
            className="object-cover"
            unoptimized
            priority
            sizes="(max-width: 400px) 280px, 320px"
          />
        </div>

        <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#ff3366] via-[#ffd93d] to-[#ff3366] bg-clip-text text-transparent animate-gradient mb-10">
          💕 Will you be my Valentine? 💕
        </p>

        {/* Buttons - Yes fixed, No moves but stays on screen (position:fixed when moved) */}
        <div className="relative w-full min-h-[140px] flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleYesClick}
            className={`px-10 py-4 rounded-2xl bg-gradient-to-r from-[#ff3366] to-[#ff6b8a] text-white font-bold text-lg shadow-lg shadow-[#ff3366]/40 hover:shadow-[#ff3366]/60 transition-all duration-200 z-10 ${
              yesClicking ? "yes-click" : "hover:scale-105 active:scale-95"
            }`}
          >
            Yes! 💖
          </button>

          <button
            onClick={handleNoClick}
            className={`px-8 py-3 rounded-2xl glass text-[#e5e7eb] font-medium border border-white/20 hover:bg-white/10 transition-all duration-200 z-10 ${
              noPosition ? "fixed" : ""
            }`}
            style={
              noPosition
                ? {
                    left: noPosition.x,
                    top: noPosition.y,
                    transition: "left 0.2s ease-out, top 0.2s ease-out",
                  }
                : undefined
            }
          >
            No 😢
          </button>
        </div>
      </div>
    </main>
  );
}

export default function PartnerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-mesh text-[#ff3366]">
          Loading...
        </div>
      }
    >
      <PartnerPageContent />
    </Suspense>
  );
}
