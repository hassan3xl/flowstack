"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Shield, Users, Users2Icon } from "lucide-react";

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

export default function ServerCard({ server, bg }: ServerCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/server/${server.id}`)}
      className={`border rounded-lg p-1 shadow-sm hover:shadow-md cursor-pointer transition ${bg}`}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-16 h-16 flex-shrink-0">
          <Image
            src={server?.icon || "/serverIcon.png"}
            alt="message icon"
            width={64}
            height={64}
            className="rounded-lg object-cover w-full h-full"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
