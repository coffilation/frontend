import { Map } from 'widgets/map/ui/map/map'
import { Search } from '../search'

import styles from './map.module.scss'
import { useGeoPointsSearch } from 'pages/map/lib'
import { useState } from 'react'

export const MapPage = () => {
  const { geoPoints, handleSearch, isValidating } = useGeoPointsSearch()
  const [activeGeoPointIndex, setActiveGeoPointIndex] = useState<number>()

  return (
    <div className={styles.wrapper}>
      <Map geoPoints={geoPoints} activeGeoPointIndex={activeGeoPointIndex} />

      <div className={styles.searchWrapper}>
        <Search
          handleSearch={handleSearch}
          geoPoints={geoPoints}
          isValidating={isValidating}
          setActiveGeoPointIndex={setActiveGeoPointIndex}
        />
      </div>
    </div>
  )
}
