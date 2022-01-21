import { System } from "@javelin/ecs";
import * as React from "react";
import { useWorld } from "../use-world/useWorld";

export function useSystem(system: System<unknown>, deps: any[] = []): void {
  const world = useWorld();

  React.useEffect(() => {
    if (world) {
      world.addSystem(system);
    }
    return () => {
      if (world) {
        world.removeSystem(system);
      }
    };
  }, [system, world, ...deps]);
}
