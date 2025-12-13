"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";

interface ServerCardProps {
  server: {
    id: string;
    name: string;
    description: string;
    icon: string | null;
    member_count: number;
    server_type: string;
  };
  bg: string;
}

export default function ServerCard({ server }: ServerCardProps) {
  const router = useRouter();
  const { isOpen } = useSidebar();

  // Helper to get the first letter safely
  const firstLetter = server.name ? server.name.charAt(0).toUpperCase() : "?";

  const handleNavigateToServer = () => {
    // Store transition state
    sessionStorage.setItem("showTransition", "true");
    router.push(`/server/${server.id}`);
  };

  return (
    <div
      onClick={handleNavigateToServer}
      className={`border rounded-lg p-1 shadow-sm hover:shadow-md cursor-pointer transition bg-accent/50`}
    >
      <div className="flex items-center gap-4">
        {/* Icon Container */}
        <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
          {server.icon ? (
            <Image
              src={server.icon}
              alt={server.name}
              width={64}
              height={64}
              className="rounded-lg object-cover w-full h-full"
              unoptimized
            />
          ) : (
            /* Fallback: First Letter */
            <div className="w-full h-full rounded-lg bg-gray-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {firstLetter}
              </span>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="flex flex-col md:hidden">
          {isOpen && (
            <div>
              <p className="font-medium">{server.name}</p>
              <p className="text-sm text-muted-foreground">
                {server.member_count} Members
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
