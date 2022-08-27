import { Map } from 'widgets/map/ui/map/map'
import { Search } from '../search'

import styles from './map.module.scss'
import { useGeoPointsSearch } from 'pages/map/lib'
import { ComponentProps, useMemo, useState } from 'react'
import { Place } from 'widgets/place/ui/place'
import { usePlaces } from 'entities/places/lib'
import { geoPointToPlace } from 'pages/map/lib/geo-point-to-place'
import { Filters } from 'pages/map/ui/filters'

export const MapPage = () => {
  const { geoPoints, handleSearch, isValidating, clearGeoPoints } =
    useGeoPointsSearch()
  const [activePlace, setActivePlace] =
    useState<Components.Schemas.CreatePlaceDto>()

  const { data: places } = usePlaces()

  const points = useMemo<ComponentProps<typeof Map>['points']>(() => {
    let points: ComponentProps<typeof Map>['points'] = []

    if (places) {
      points = points.concat(places)
    }

    if (geoPoints) {
      points = points.concat(geoPoints.map(geoPointToPlace))
    }

    return points
  }, [geoPoints, places])

  return (
    <div className={styles.wrapper}>
      <div className={styles.mapWrapper}>
        <Map
          showControls
          className={styles.map}
          points={points}
          activePlace={activePlace}
          setActivePlace={setActivePlace}
        />
      </div>
      {!!activePlace && <Place place={activePlace} />}
      <div className={styles.searchWrapper}>
        <Search
          handleSearch={handleSearch}
          geoPoints={geoPoints}
          isValidating={isValidating}
          setActivePlace={setActivePlace}
          hasActivePlace={!!activePlace}
          clearGeoPoints={clearGeoPoints}
        />
      </div>
      {!activePlace && <Filters />}
    </div>
  )
}
