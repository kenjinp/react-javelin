import { World } from "@javelin/ecs";
import * as React from "react";
import { WorldContext } from "../../providers/world-provider/WorldProvider";

export function useWorld(): World | null {
  return React.useContext<World | null>(WorldContext);
}
