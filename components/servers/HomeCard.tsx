"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeCard() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/home`)}
      className="border rounded-lg p-1 shadow-sm hover:shadow-md bg-red-800 cursor-pointer transition"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-16 h-16 flex-shrink-0">
          <Image
            src="/homeIcon.png"
            alt="message icon"
            width={64}
            height={64}
            className="rounded-lg object-cover w-full h-full"
            unoptimized
          />
        </div>

        {/* Text */}
      </div>
    </div>
  );
}
