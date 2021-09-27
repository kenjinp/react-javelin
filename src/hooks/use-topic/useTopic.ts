import { Topic } from "@javelin/ecs";
import * as React from "react";

import useWorld from "../use-world/useWorld";

export default function useTopic(topic: Topic): void {
  const world = useWorld();
  React.useEffect(() => {
    world.addTopic(topic);
    return () => {
      world.removeTopic(topic);
    };
  }, [topic, world]);
}
