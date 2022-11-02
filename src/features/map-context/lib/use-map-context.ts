import { useContext, useMemo } from 'react'

import { MapContext, MapContextValue } from './map-context'

export const useMapContext = <T>(
  getValueCallback: (contextValue: MapContextValue) => T,
) => {
  const context = useContext(MapContext)

  return useMemo(() => getValueCallback(context), [context, getValueCallback])
}
