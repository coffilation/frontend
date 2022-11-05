import { Map } from 'widgets/map/ui'
import { Outlet } from 'react-router-dom'

import styles from './map.module.scss'
import { useState } from 'react'
import { PlacePoints } from 'pages/map/ui/place-points'
import { MapProvider } from 'features/map-context/ui'

export const MapPage = () => {
  const [activePlaceIndex, setActivePlaceIndex] = useState<number>()

  return (
    <div className={styles.wrapper}>
      <div className={styles.mapWrapper}>
        <MapProvider>
          <Map showControls className={styles.map}>
            <PlacePoints
              activePlaceIndex={activePlaceIndex}
              setActivePlaceIndex={setActivePlaceIndex}
            />
          </Map>
          <Outlet />
        </MapProvider>
      </div>
    </div>
  )
}
