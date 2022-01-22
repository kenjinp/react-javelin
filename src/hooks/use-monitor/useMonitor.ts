import { Query, useMonitor as useJavelinMonitor } from "@javelin/ecs";
import debounce from "lodash/debounce";
import * as React from "react";
import { useWorld } from "../use-world/useWorld";

// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
export function uuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

export const DEFAULT_MONITOR_DEBOUNCE_MS = 0;
export function useMonitor(query: Query, debounceMs = DEFAULT_MONITOR_DEBOUNCE_MS): number[] {
  const [matchingEntityIds] = React.useState(new Set<number>());
  const valuesRef = React.useRef<number[]>([]);
  const [updates, setUpdates] = React.useState(uuidv4());
  const world = useWorld();
  const update = React.useRef(
    debounce(() => {
      valuesRef.current = Array.from(matchingEntityIds.values());
      setUpdates(uuidv4());
    }, debounceMs)
  );

  React.useEffect(() => {
    const system = () => {
      useJavelinMonitor(
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
  }, [world, update, matchingEntityIds]);

  const entitiesIdList = React.useMemo(() => valuesRef.current, [updates]);

  return entitiesIdList;
}
