import { Query, World } from "@javelin/ecs";
import * as React from "react";
import { useMonitor } from "../../hooks/use-monitor/useMonitor";
import { useWorld } from "../../hooks/use-world/useWorld";
import { EntityProvider } from "../../providers/entity-provider/EntityProvider";

export interface MonitorProps {
  query: Query;
  children: (props: { entityId: number; world: World }) => React.ReactChild | React.ReactChild[] | null;
}

export const Monitor: React.FC<MonitorProps> = ({ children, query }) => {
  const entities = useMonitor(query);
  const world = useWorld();

  return (
    <>
      {entities.map((entityId: number) => {
        return (
          <EntityProvider entityId={entityId} key={entityId}>
            {children({ entityId, world })}
          </EntityProvider>
        );
      })}
    </>
  );
};
