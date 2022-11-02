import { Map } from 'widgets/map/ui'
import { Map as LeafletMap } from 'leaflet'
import { Outlet } from 'react-router-dom'

import styles from './map.module.scss'
import { useCallback, useState } from 'react'
import { PlacePoints } from 'pages/map/ui/place-points'
import { MapProvider } from 'features/map-context/ui'

export const MapPage = () => {
  const [activePlaceIndex, setActivePlaceIndex] = useState<number>()
  const [expandActivePlace, setExpandActivePlace] = useState(false)

  const [map, setMap] = useState<LeafletMap>()

  const onDismiss = useCallback(() => setExpandActivePlace(false), [])

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
