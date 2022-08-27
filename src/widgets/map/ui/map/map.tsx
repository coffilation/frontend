import { MapContainer, TileLayer } from 'react-leaflet'
import React, { Dispatch, SetStateAction } from 'react'

import styles from './map.module.scss'
import { Point } from 'widgets/map/ui/point/point'
import classNames from 'classnames'
import { PanRestorer } from 'widgets/map/ui/pan-restorer/pan-restorer'
import { Controls } from 'widgets/map/ui/controls'

interface MapProps {
  className?: string
  points?: Components.Schemas.CreatePlaceDto[]
  showControls?: boolean
  activePlace: Components.Schemas.CreatePlaceDto | undefined
  setActivePlace: Dispatch<
    SetStateAction<Components.Schemas.CreatePlaceDto | undefined>
  >
}

export const Map = ({
  points,
  activePlace,
  className,
  setActivePlace,
  showControls,
}: MapProps) => {
  return (
    <>
      <MapContainer
        center={
          activePlace
            ? [activePlace.latitude, activePlace.longitude]
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
            place={point}
            isSelected={point.osmId === activePlace?.osmId}
            setActivePlace={setActivePlace}
          />
        ))}
        <PanRestorer hasActiveGeoPoint={!!activePlace} />
        {showControls && <Controls />}
      </MapContainer>
    </>
  )
}
