import { MapContainer, TileLayer } from 'react-leaflet'
import React, { useMemo } from 'react'

import styles from './map.module.scss'
import { Point } from 'widgets/map/ui/point/point'
import classNames from 'classnames'
import { GeoPoint } from 'entities/geo-points/lib'
import { PanRestorer } from 'widgets/map/ui/pan-restorer/pan-restorer'

interface MapProps {
  className?: string
  geoPoints?: GeoPoint[]
  activeGeoPointIndex: number | undefined
}

export const Map = ({
  geoPoints,
  activeGeoPointIndex,
  className,
}: MapProps) => {
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
        className={classNames(styles.wrapper, className)}
        zoomControl={false}
      >
        <TileLayer
          url={`https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}@2x.png?apikey=${process.env.REACT_APP_MAPS_API_KEY}`}
        />
        {geoPoints?.map((geoPoint) => (
          <Point
            key={geoPoint.osm_id}
            latitude={parseFloat(geoPoint.lat)}
            longitude={parseFloat(geoPoint.lon)}
            isSelected={geoPoint.osm_id === activeGeoPoint?.osm_id}
          />
        ))}
        <PanRestorer hasActiveGeoPoint={activeGeoPointIndex !== undefined} />
      </MapContainer>
    </>
  )
}
