import { Query, useMonitor as useJavelinMonitor, useWorld } from "@javelin/ecs";
import { debounce, uniqueId } from "lodash";
import * as React from "react";
import { useSystem } from "../use-system/useSystem";

export const DEFAULT_MONITOR_DEBOUNCE_MS = 0;
export function useMonitor(query: Query, name = uniqueId(), debounceMs = DEFAULT_MONITOR_DEBOUNCE_MS): number[] {
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

  useSystem(() => {
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
  }, [world, matchingEntityIds, query]);

  const entitiesIdList = React.useMemo(() => valuesRef.current, [updates]);

  return entitiesIdList;
}
