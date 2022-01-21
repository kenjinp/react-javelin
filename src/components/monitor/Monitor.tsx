import { Query, useMonitor, World } from "@javelin/ecs";
import { debounce, uniqueId } from "lodash";
import * as React from "react";
import { useWorld } from "../../hooks/use-world/useWorld";
import { EntityContext } from "../../providers/entity-provider/EntityProvider";

export interface MonitorProps {
  query: Query;
  children: (props: { entityId: number; world: World | null }) => React.ReactChild | React.ReactChild[] | null;
  name?: string;
  debounceMs?: number;
}

export const Monitor: React.FC<MonitorProps> = ({ children, query, name = uniqueId(), debounceMs = 100 }) => {
  const [matchingEntityIds] = React.useState(new Set<number>());
  const valuesRef = React.useRef<number[]>([]);
  const [updates, setUpdates] = React.useState(uniqueId());
  const world = useWorld();
  const update = React.useRef(
    debounce(() => {
      valuesRef.current = Array.from(matchingEntityIds.values());
      setUpdates(uniqueId());
    }, debounceMs)
  );

  React.useEffect(() => {
    const system = () => {
      useMonitor(
        query,
        (entityId: number) => {
          matchingEntityIds.add(entityId);
          update.current();
        },
        (entityId: number) => {
          matchingEntityIds.delete(entityId);
          update.current();
        }
      );
    };
    if (world) {
      world.addSystem(system);
    }
    return () => {
      if (world) {
        world.removeSystem(system);
      }
    };
  }, [world, matchingEntityIds, query]);

  const entities = React.useMemo(() => {
    return (
      <React.Fragment key={name}>
        {valuesRef.current.map((entityId: number) => {
          return (
            <EntityContext.Provider value={entityId} key={entityId}>
              {children({ entityId, world })}
            </EntityContext.Provider>
          );
        })}
      </React.Fragment>
    );
  }, [updates, children, name, world]);

  return entities;
};
