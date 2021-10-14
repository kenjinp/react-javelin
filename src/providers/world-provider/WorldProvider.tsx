import { createWorld, World } from "@javelin/ecs";
import * as React from "react";

const defaultWorld: World = createWorld();

export const WorldContext = React.createContext<World>(defaultWorld);

export const WorldProvider: React.FC<{ world: World }> = (props) => {
  const [world, setWorld] = React.useState<World>(props.world || createWorld());

  React.useEffect(() => {
    setWorld(props.world);
  }, [props.world]);

  return <WorldContext.Provider value={world}>{props.children}</WorldContext.Provider>;
};
