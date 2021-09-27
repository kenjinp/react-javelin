import { System } from "@javelin/ecs";
import * as React from "react";

import useWorld from "../use-world/useWorld";

export default function useSystem<T>(system: System<T>): void {
  const world = useWorld();

  React.useEffect(() => {
    world.addSystem(system);
    return () => {
      world.removeSystem(system);
    };
  }, [system, world]);
}
