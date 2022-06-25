import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import React from 'react'

import styles from './map.module.scss'

export const Map = () => {
  return (
    <>
      <MapContainer
        center={[59.9375, 30.308611]}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.wrapper}
      >
        <TileLayer
          url={`https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}@2x.png?apikey=${process.env.REACT_APP_MAPS_API_KEY}`}
        />
        <Marker position={[59.9375, 30.308611]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  )
}
