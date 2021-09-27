import { Query, useMonitor as javelinUseQueryMonitor } from "@javelin/ecs";
import { difference, without } from "lodash";
import * as React from "react";

import useSystem from "../use-system/useSystem";

export default function useMonitor(query: Query): number[] {
  const [matchingEntityIds, setMatchingEntityIds] = React.useState<number[]>([]);

  useSystem(() => {
    javelinUseQueryMonitor(
      query,
      (entityId: number) => {
        const newList = [...without(matchingEntityIds, entityId), entityId];
        const diff = difference(newList, matchingEntityIds);
        if (diff.length) {
          setMatchingEntityIds(newList);
        }
      },
      (entityId: number) => {
        setMatchingEntityIds(without(matchingEntityIds, entityId));
      }
    );
  });

  return matchingEntityIds;
}
