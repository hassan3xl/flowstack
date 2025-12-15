"use client";
import { useState } from "react";
import { useGetPublicServers, useGetServers } from "@/lib/hooks/server.hooks";
import ServerCard from "./ServerCard";

import { createPortal } from "react-dom";
import { formatDate } from "@/lib/utils";

export default function ServersPage() {
  const { data: servers, isLoading } = useGetServers();

  const [hoveredServer, setHoveredServer] = useState<any>(null);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);

  const handleHover = (server: any, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoverPosition(rect.top + window.scrollY);
    setHoveredServer(server);
  };

  const clearHover = () => {
    setHoveredServer(null);
    setHoverPosition(null);
  };

  return (
    <div className="">
      <div>
        {servers?.length > 0 && (
          <div className="flex flex-col w-full md:w-18 gap-2 mt-4">
            {servers.map((server: any) => (
              <div
                key={server.id}
                onMouseEnter={(e) => handleHover(server, e)}
                onMouseLeave={clearHover}
              >
                <ServerCard server={server} />
              </div>
            ))}
          </div>
        )}
      </div>
      {hoveredServer &&
        createPortal(
          <div
            className="absolute left-28 w-80 p-4 rounded-lg shadow-xl bg-accent border border-border z-50"
            style={{ top: hoverPosition || 0 }}
          >
            <HoverInfo server={hoveredServer} />
          </div>,
          document.body
        )}
    </div>
  );
}

function HoverInfo({ server }: { server: any }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{server.name}</h2>

      {/* Add your custom details */}
      <div className="text-gray-300 text-sm space-y-1">
        <p>Members: {server.members_count}</p>
        <p>Created: {formatDate(server.created_at)}</p>
        <p>{server.server_type} server</p>
      </div>
    </div>
  );
}
