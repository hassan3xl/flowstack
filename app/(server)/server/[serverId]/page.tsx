"use client";

import Header from "@/components/Header";
import { useServer } from "@/contexts/ServerContext";
import { useGetServer } from "@/lib/hooks/server.hooks";
import React from "react";

const ServerDetails = () => {
  const { serverId } = useServer();

  const { data: server } = useGetServer(serverId as string);

  return (
    <div>
      <Header
        title={server?.name}
        subtitle={server?.description}
        stats={[
          {
            title: "Total Projects",
            value: server?.total_projects || 0,
          },
          {
            title: "Active Projects",
            value: server?.total_projects || 0,
          },
          {
            title: "Active Members",
            value: server?.total_projects || 0,
          },
          {
            title: "Active Projects",
            value: server?.total_projects || 0,
          },
        ]}
      />
      <div className="mt-4">
        <p>recent activity</p>
      </div>
    </div>
  );
};

export default ServerDetails;
