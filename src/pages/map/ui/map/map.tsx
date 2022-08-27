import { Map } from 'widgets/map/ui/map/map'
import { Search } from '../search'

import styles from './map.module.scss'
import { useGeoPointsSearch } from 'pages/map/lib'
import { ComponentProps, useMemo, useState } from 'react'
import { Place } from 'widgets/place/ui/place'
import { usePlaces } from 'entities/places/lib'
import {GeoPoint} from "entities/geo-points/lib";

export const MapPage = () => {
  const { geoPoints, handleSearch, isValidating, clearGeoPoints } =
    useGeoPointsSearch()
  const [activeGeoPoint, setActiveGeoPoint] = useState<GeoPoint>()

  const { data: places } = usePlaces()

  const points = useMemo<ComponentProps<typeof Map>['points']>(() => {
    let points: ComponentProps<typeof Map>['points'] = []

    if (places) {
      points = points.concat(places)
    }

    if (geoPoints) {
      points = points.concat(
        geoPoints.map((point) => ({
          osmId: point.osm_id,
          latitude: parseFloat(point.lat),
          longitude: parseFloat(point.lon),
        }))
      )
    }

    return points
  }, [geoPoints, places])

  return (
    <div className={styles.wrapper}>
      <div className={styles.mapWrapper}>
        <Map
          className={styles.map}
          points={points}
          activeGeoPoint={activeGeoPoint}
        />
      </div>
      {!!activeGeoPoint && (
        <Place geoPoint={activeGeoPoint} />
      )}
      <div className={styles.searchWrapper}>
        <Search
          handleSearch={handleSearch}
          geoPoints={geoPoints}
          isValidating={isValidating}
          setActiveGeoPoint={setActiveGeoPoint}
          hasActiveGeoPoint={!!activeGeoPoint}
          clearGeoPoints={clearGeoPoints}
        />
      </div>
    </div>
  )
}
