import * as React from "react";

export const EntityContext = React.createContext<number | null>(null);

export interface EntityProviderProps {
  entityId: number;
}

const EntityProvider: React.FC<EntityProviderProps> = ({ entityId, children }) => {
  return <EntityContext.Provider value={entityId}>{children}</EntityContext.Provider>;
};

export default EntityProvider;
