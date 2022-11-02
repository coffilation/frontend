import { ReactNode, useMemo, useState } from 'react'
import { Map } from 'leaflet'

import { MapContext } from '../lib/map-context'

interface MapProviderProps {
  children: ReactNode
}

export const MapProvider = ({ children }: MapProviderProps) => {
  const [map, setMap] = useState<Map | null>(null)
  const [places, setPlaces] = useState<Components.Schemas.Place[]>()

  const value = useMemo(
    () => ({ map, setMap, places, setPlaces }),
    [map, places],
  )

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}
