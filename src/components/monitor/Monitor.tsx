import { Query, World } from "@javelin/ecs";
import * as React from "react";
import { useMonitor } from "../../hooks/use-monitor/useMonitor";
import { useWorld } from "../../hooks/use-world/useWorld";
import { EntityContext } from "../../providers/entity-provider/EntityProvider";

export interface MonitorProps {
  query: Query;
  children: (props: { entityId: number; world: World | null }) => React.ReactChild | React.ReactChild[] | null;
}

export const Monitor: React.FC<MonitorProps> = ({ children, query }) => {
  const entities = useMonitor(query);
  const world = useWorld();

  return (
    <>
      {entities.map((entityId: number) => {
        return (
          <EntityContext.Provider value={entityId} key={entityId}>
            {children({ entityId, world })}
          </EntityContext.Provider>
        );
      })}
    </>
  );
};
