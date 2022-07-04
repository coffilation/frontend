import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import React, { useMemo } from 'react'

import styles from './map.module.scss'
import { PathOptions } from 'leaflet'
import { useGeoPointsSearch } from 'pages/map/lib'

interface MapProps {
  geoPoints?: ReturnType<typeof useGeoPointsSearch>['geoPoints']
  activeGeoPointIndex: number | undefined
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

export const Map = ({ geoPoints, activeGeoPointIndex }: MapProps) => {
  const activeGeoPoint = useMemo(() => {
    if (activeGeoPointIndex !== undefined) {
      return geoPoints?.[activeGeoPointIndex]
    }
  }, [activeGeoPointIndex, geoPoints])

  return (
    <>
      <MapContainer
        center={
          activeGeoPoint?.lat && activeGeoPoint?.lon
            ? [parseFloat(activeGeoPoint?.lat), parseFloat(activeGeoPoint?.lon)]
            : [59.9375, 30.308611]
        }
        zoom={13}
        scrollWheelZoom={false}
        className={styles.wrapper}
        zoomControl={false}
      >
        <TileLayer
          url={`https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}@2x.png?apikey=${process.env.REACT_APP_MAPS_API_KEY}`}
        />
        {geoPoints?.map((getPoint) => (
          <CircleMarker
            key={getPoint.osm_id}
            center={[parseFloat(getPoint.lat), parseFloat(getPoint.lon)]}
            pathOptions={
              getPoint.osm_id === activeGeoPoint?.osm_id
                ? activeMarkerPathOptions
                : markerPathOptions
            }
            radius={6}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </>
  )
}
