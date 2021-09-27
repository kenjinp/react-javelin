import * as React from "react";

import { EntityContext } from "../../providers/entity-provider/EntityProvider";

export default function useEntity(): number | null {
  const entityId = React.useContext<number | null>(EntityContext);

  return entityId;
}
