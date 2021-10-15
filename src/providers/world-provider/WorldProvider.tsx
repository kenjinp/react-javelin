import { World } from "@javelin/ecs";
import * as React from "react";

export const WorldContext = React.createContext<World | null>(null);

export const WorldProvider = WorldContext.Provider;
