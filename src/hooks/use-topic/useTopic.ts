import { Topic } from "@javelin/ecs";
import * as React from "react";
import { useWorld } from "../use-world/useWorld";

export function useTopic(topic: Topic): void {
  const world = useWorld();
  React.useEffect(() => {
    if (world) {
      world.addTopic(topic);
    }
    return () => {
      if (world) {
        world.removeTopic(topic);
      }
    };
  }, [topic, world]);
}
