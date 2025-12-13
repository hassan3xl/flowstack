"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserCard() {
  const router = useRouter();
  const { isOpen, closeSidebar } = useSidebar();
  const { user } = useAuth();

  return (
    <div
      onClick={() => {
        router.push(`/account`);
        closeSidebar();
      }}
      className="border rounded-lg p-1 shadow-sm hover:shadow-md bg-accent cursor-pointer transition"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-16 h-16 flex-shrink-0">
          <Image
            src={user?.avatar || "/userIcon.png"}
            alt="user icon"
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
              <p>{user?.username}</p>
              <p>{user?.user.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
