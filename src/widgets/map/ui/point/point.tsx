import { CircleMarker, Popup, useMap } from 'react-leaflet'
import React, { useEffect } from 'react'
import { PathOptions } from 'leaflet'

interface PointProps {
  latitude: number
  longitude: number
  isSelected?: boolean
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

export const Point = ({ latitude, longitude, isSelected }: PointProps) => {
  const map = useMap()

  useEffect(() => {
    if (isSelected) {

      const point = map.project([latitude, longitude])
      point.y += 160

      map.flyTo(map.unproject(point), map.getZoom(), {
        animate: true,
        duration: 0.15,
      })
    }
  }, [isSelected, latitude, longitude, map])

  return (
    <>
      <CircleMarker
        center={[latitude, longitude]}
        pathOptions={isSelected ? activeMarkerPathOptions : markerPathOptions}
        radius={6}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </CircleMarker>
    </>
  )
}
