"use client";
import { useState } from "react";
import { useGetPublicServers, useGetServers } from "@/lib/hooks/server.hooks";
import ServerCard from "./ServerCard";
import Loader from "../Loader";
import MessageCard from "../messages/MessageCard";
import { createPortal } from "react-dom";
import HomeCard from "./HomeCard";
import UserCard from "./UserCard";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import AddServerModal from "./AddServerModal";
import { formatDate } from "@/lib/utils";
import { InvitesType } from "@/lib/types/server.types";

interface ServerPageProps {
  setOpenAddServerModal: (open: boolean) => void;
  setOpenServerInviteModal: (open: boolean) => void;
  invites: InvitesType[];
  isOpen: boolean;
}

export default function ServersPage({
  setOpenAddServerModal,
  setOpenServerInviteModal,
  invites,
  isOpen,
}: ServerPageProps) {
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

  const PrivateServerBgColor = "bg-green-950";

  return (
    <div className="flex flex-col mt-1 justify-between min-h-[92vh] space-y-1">
      {/* MAIN CONTENT */}
      <div>
        {/* Private Servers */}
        <div className="flex flex-col w-full md:w-18 gap-2 mt-4">
          <HomeCard />
          <MessageCard />
        </div>
        <hr className="py-2 mt-6" />

        {servers?.length > 0 && (
          <div className="flex flex-col w-full md:w-18 gap-2 mt-4">
            {servers.map((server: any) => (
              <div
                key={server.id}
                onMouseEnter={(e) => handleHover(server, e)}
                onMouseLeave={clearHover}
              >
                <ServerCard server={server} bg={PrivateServerBgColor} />
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

      {/* PINNED USER CARD AT BOTTOM */}
      <div className="mt-auto py-4">
        <div className="flex flex-col w-full md:w-18 gap-2 mt-4">
          <Button
            onClick={() => setOpenServerInviteModal(true)}
            size={"sm"}
            variant={"outline"}
          >
            {invites?.length > 0 &&
              invites?.map((inv) => inv.status === "pending") && (
                <div className="bg-red-500 rounded-full right-0 w-3 h-3 absolute" />
              )}
            Invites
          </Button>
          <Button
            onClick={() => setOpenAddServerModal(true)}
            size={"sm"}
            variant={"outline"}
          >
            <PlusIcon />
          </Button>

          <UserCard />
        </div>
      </div>
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
