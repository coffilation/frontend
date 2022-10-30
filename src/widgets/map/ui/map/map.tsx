import { Map as LeafletMap } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'
import React, { Dispatch, ReactNode, RefObject } from 'react'
import classNames from 'classnames'

import { Controls } from 'widgets/map/ui/controls'

import styles from './map.module.scss'

interface MapProps {
  className?: string
  showControls?: boolean
  children: ReactNode
  setMap: Dispatch<LeafletMap>
}

export const Map = ({
  className,
  showControls,
  children,
  setMap,
}: MapProps) => {
  return (
    <>
      <MapContainer
        center={[59.9375, 30.308611]}
        zoom={13}
        scrollWheelZoom={false}
        className={classNames(styles.wrapper, className)}
        zoomControl={false}
        ref={setMap}
      >
        <TileLayer
          url={`https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}@2x.png?apikey=${process.env.REACT_APP_MAPS_API_KEY}`}
        />
        {children}
        {showControls && <Controls />}
      </MapContainer>
    </>
  )
}
