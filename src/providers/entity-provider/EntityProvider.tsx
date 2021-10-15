import * as React from "react";

export const EntityContext = React.createContext<number | null>(null);

export const EntityProvider = EntityContext.Provider;
