import { CircleMarker, Popup, useMap } from 'react-leaflet'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { PathOptions } from 'leaflet'

interface PointProps {
  place: Components.Schemas.CreatePlaceDto
  setActivePlace: Dispatch<
    SetStateAction<Components.Schemas.CreatePlaceDto | undefined>
  >
  isSelected: boolean
}

const markerPathOptions: PathOptions = {
  color: '#663F3F',
  weight: 4,
  fillColor: `#fff`,
  fillOpacity: 1,
}

const activeMarkerPathOptions: PathOptions = {
  ...markerPathOptions,
  color: '#EC4646',
}

export const Point = ({ isSelected, setActivePlace, place }: PointProps) => {
  const map = useMap()

  useEffect(() => {
    if (isSelected) {
      const point = map.project([place.latitude, place.longitude])
      point.y += 160

      map.flyTo(map.unproject(point), map.getZoom(), {
        animate: true,
        duration: 0.15,
      })
    }
  }, [isSelected, map, place.latitude, place.longitude])

  return (
    <>
      <CircleMarker
        center={[place.latitude, place.longitude]}
        pathOptions={isSelected ? activeMarkerPathOptions : markerPathOptions}
        radius={6}
        eventHandlers={{
          click: () => setActivePlace(place),
        }}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </CircleMarker>
    </>
  )
}
