import { Map } from 'widgets/map/ui/map/map'
import { Search } from '../search'

import styles from './map.module.scss'
import { useGeoPointsSearch } from 'pages/map/lib'
import { useState } from 'react'
import { Place } from 'widgets/place/ui/place'

export const MapPage = () => {
  const { geoPoints, handleSearch, isValidating, clearGeoPoints } =
    useGeoPointsSearch()
  const [activeGeoPointIndex, setActiveGeoPointIndex] = useState<number>()

  const hasActiveGeoPointIndex = activeGeoPointIndex !== undefined

  return (
    <div className={styles.wrapper}>
      <div className={styles.mapWrapper}>
        <Map
          className={styles.map}
          geoPoints={geoPoints}
          activeGeoPointIndex={activeGeoPointIndex}
        />
      </div>
      {hasActiveGeoPointIndex && (
        <Place geoPoint={geoPoints?.[activeGeoPointIndex]} />
      )}
      <div className={styles.searchWrapper}>
        <Search
          handleSearch={handleSearch}
          geoPoints={geoPoints}
          isValidating={isValidating}
          setActiveGeoPointIndex={setActiveGeoPointIndex}
          hasActiveGeoPointIndex={hasActiveGeoPointIndex}
          clearGeoPoints={clearGeoPoints}
        />
      </div>
    </div>
  )
}
