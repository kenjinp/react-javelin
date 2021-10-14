import * as React from "react";
import { EntityContext } from "../../providers/entity-provider/EntityProvider";

export function useEntity(): number | null {
  const entityId = React.useContext<number | null>(EntityContext);

  return entityId;
}
