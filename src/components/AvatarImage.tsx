"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK = "/me.jpg";

interface AvatarImageProps {
  /** avatarUrl from the Profile row — may be null, undefined, or empty string */
  src?: string | null;
}

// -----------------------------------------------------------------------------
// AvatarImage — Client Component
// Handles: null/empty src, broken external URLs (onError), and a styled
// initials placeholder as a last resort.
// The parent Server Component stays async; only this tiny leaf is "use client".
// -----------------------------------------------------------------------------
export default function AvatarImage({ src }: AvatarImageProps) {
  // Normalise: treat null / undefined / "" as "use local fallback"
  const resolvedSrc = src && src.trim().length > 0 ? src : FALLBACK;

  const [imgSrc, setImgSrc] = useState<string>(resolvedSrc);
  const [failed, setFailed] = useState(false);

  function handleError() {
    if (imgSrc !== FALLBACK) {
      // First failure: swap to local file
      setImgSrc(FALLBACK);
    } else {
      // Local file also failed — show initials placeholder
      setFailed(true);
    }
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-glass aspect-[3/4] w-full bg-zinc-900">
      {failed ? (
        // ── Initials placeholder ────────────────────────────────────────────
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            aria-label="Kashish Singh avatar placeholder"
            className="text-6xl font-bold text-white/20 select-none"
          >
            KS
          </span>
        </div>
      ) : (
        // ── Actual image ────────────────────────────────────────────────────
        <Image
          src={imgSrc}
          alt="Kashish Singh - Software Developer and Founder of Navojit"
          fill
          sizes="(max-width: 768px) 100vw, 288px"
          className="object-cover"
          priority
          onError={handleError}
        />
      )}
    </div>
  );
}
