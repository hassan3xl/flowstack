"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MessageCard() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/chats`)}
      className="border rounded-lg p-1 shadow-sm hover:shadow-md bg-orange-800 cursor-pointer transition"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-16 h-16 flex-shrink-0">
          <Image
            src="/messageIcon.png"
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
