import { MapContainer, TileLayer } from 'react-leaflet'
import React  from 'react'

import styles from './map.module.scss'
import { Point } from 'widgets/map/ui/point/point'
import classNames from 'classnames'
import { GeoPoint } from 'entities/geo-points/lib'
import { PanRestorer } from 'widgets/map/ui/pan-restorer/pan-restorer'

interface MapProps {
  className?: string
  points?: Pick<Components.Schemas.Place, `osmId` | `latitude` | `longitude`>[]
  activeGeoPoint: GeoPoint | undefined
}

export const Map = ({ points, activeGeoPoint, className }: MapProps) => {

  return (
    <>
      <MapContainer
        center={
          activeGeoPoint
            ? [parseFloat(activeGeoPoint.lat), parseFloat(activeGeoPoint.lon)]
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
        {points?.map((point) => (
          <Point
            key={point.osmId}
            latitude={point.latitude}
            longitude={point.longitude}
            isSelected={point.osmId === activeGeoPoint?.osm_id}
          />
        ))}
        <PanRestorer hasActiveGeoPoint={!!activeGeoPoint} />
      </MapContainer>
    </>
  )
}
