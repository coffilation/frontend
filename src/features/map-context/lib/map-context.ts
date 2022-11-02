import { createContext, Dispatch, SetStateAction } from 'react'
import { Map } from 'leaflet'

export interface MapContextValue {
  map?: Map | null
  places?: Components.Schemas.Place[]
  setMap?: Dispatch<SetStateAction<Map | null>>
  setPlaces?: Dispatch<SetStateAction<Components.Schemas.Place[] | undefined>>
}

export const MapContext = createContext<MapContextValue>({})
