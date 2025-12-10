"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserCard() {
  const router = useRouter();
  const { isOpen } = useSidebar();

  return (
    <div
      onClick={() => router.push(`/home`)}
      className="border rounded-lg p-1 shadow-sm hover:shadow-md bg-yellow-800 cursor-pointer transition"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-16 h-16 flex-shrink-0">
          <Image
            src="/userIcon.png"
            alt="message icon"
            width={64}
            height={64}
            className="rounded-lg object-cover w-full h-full"
            unoptimized
          />
        </div>

        {/* Text */}
        <div className="flex flex-col md:hidden">
          {isOpen && (
            <div>
              <p>Home</p>
              <p>coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
