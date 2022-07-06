import { Map } from 'widgets/map/ui/map/map'
import { Search } from '../search'

import styles from './map.module.scss'
import { useGeoPointsSearch } from 'pages/map/lib'
import { useState } from 'react'
import { Typography } from 'antd'

export const MapPage = () => {
  const { geoPoints, handleSearch, isValidating, clearGeoPoints } = useGeoPointsSearch()
  const [activeGeoPointIndex, setActiveGeoPointIndex] = useState<number>()

  const hasActiveGeoPointIndex = activeGeoPointIndex !== undefined

  return (
    <div className={styles.wrapper}>
      <div
        className={
          hasActiveGeoPointIndex
            ? styles.shortenedMapWrapper
            : styles.mapWrapper
        }
      >
        <div className={styles.mapContainer}>
          <Map
            className={styles.map}
            geoPoints={geoPoints}
            activeGeoPointIndex={activeGeoPointIndex}
          />
        </div>
      </div>
      {hasActiveGeoPointIndex && (
        <div className={styles.infoWrapper}>
          <Typography.Title level={5}>
            {geoPoints?.[activeGeoPointIndex].display_name}
          </Typography.Title>

        </div>
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
