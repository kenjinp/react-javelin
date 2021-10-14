import { World } from "@javelin/ecs";
import * as React from "react";
import { WorldContext } from "../../providers/world-provider/WorldProvider";

export function useWorld(): World {
  const world = React.useContext<World>(WorldContext);
  return world;
}
