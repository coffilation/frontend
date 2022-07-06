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
    let sizeTimer: ReturnType<typeof setTimeout>
    let viewTimer: ReturnType<typeof setTimeout>

    if (isSelected) {
      sizeTimer = setTimeout(() => {
        map.invalidateSize({ animate: true, duration: 0.15 })
      }, 150)

      viewTimer = setTimeout(() => {
        map.setView([latitude, longitude], map.getZoom(), {
          animate: true,
          duration: 0.15,
        })
      }, 300)
    }

    return () => {
      clearTimeout(sizeTimer)
      clearTimeout(viewTimer)
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
