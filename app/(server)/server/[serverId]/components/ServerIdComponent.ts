import React from "react";

interface ServerIdComponentProps {
  params: {
    serverId: string;
  };
}

export const ServerIdComponent = ({ params }: ServerIdComponentProps) => {
  const resolvedParams = React.use(params);
  const { serverId } = resolvedParams;
};
