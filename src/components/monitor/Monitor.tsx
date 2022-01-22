import { Query, World } from "@javelin/ecs";
import { uniqueId } from "lodash";
import * as React from "react";
import { DEFAULT_MONITOR_DEBOUNCE_MS, useMonitor } from "../../hooks/use-monitor/useMonitor";
import { useWorld } from "../../hooks/use-world/useWorld";
import { EntityContext } from "../../providers/entity-provider/EntityProvider";

export interface MonitorProps {
  query: Query;
  children: (props: { entityId: number; world: World | null }) => React.ReactChild | React.ReactChild[] | null;
  name?: string;
  debounceMs?: number;
}

export const Monitor: React.FC<MonitorProps> = ({
  children,
  query,
  name = uniqueId(),
  debounceMs = DEFAULT_MONITOR_DEBOUNCE_MS,
}) => {
  const entitiesIdList = useMonitor(query, name, debounceMs);
  const world = useWorld();
  const entities = React.useMemo(() => {
    return (
      <React.Fragment key={name}>
        {entitiesIdList.map((entityId: number) => {
          return (
            <EntityContext.Provider value={entityId} key={entityId}>
              {children({ entityId, world })}
            </EntityContext.Provider>
          );
        })}
      </React.Fragment>
    );
  }, [entitiesIdList, children, name, world]);

  return entities;
};
