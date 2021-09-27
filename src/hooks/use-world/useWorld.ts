import { World } from "@javelin/ecs";
import * as React from "react";

import { WorldContext } from "../../providers/world-provider/WorldProvider";

export default function useWorld() {
  const world = React.useContext<World>(WorldContext);
  return world;
}
