import { Map } from 'widgets/map/ui/map/map'
import { Map as LeafletMap } from 'leaflet'
import { Search } from '../search'

import styles from './map.module.scss'
import { useGeoPointsSearch } from 'pages/map/lib'
import { useCallback, useMemo, useState } from 'react'
import { Place } from '../place'
import { BottomSheet } from 'pages/map/ui/bottom-sheet'
import { Places } from '../places'
import { PlacePoints } from 'pages/map/ui/place-points'

export const MapPage = () => {
  const { geoPoints, handleSearch, isValidating, clearGeoPoints } =
    useGeoPointsSearch()
  const [activePlaceIndex, setActivePlaceIndex] = useState<number>()
  const [expandActivePlace, setExpandActivePlace] = useState(false)

  const [map, setMap] = useState<LeafletMap>()

  const activePlace = useMemo(
    () =>
      activePlaceIndex !== undefined
        ? geoPoints?.[activePlaceIndex]
        : undefined,
    [activePlaceIndex, geoPoints],
  )

  const onDismiss = useCallback(() => setExpandActivePlace(false), [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.mapWrapper}>
        <Map showControls className={styles.map} setMap={setMap}>
          <PlacePoints
            activePlaceIndex={activePlaceIndex}
            places={geoPoints}
            setActivePlaceIndex={setActivePlaceIndex}
          />
        </Map>
        <BottomSheet open={activePlaceIndex === undefined}>
          <Search
            map={map}
            handleSearch={handleSearch}
            geoPoints={geoPoints}
            isValidating={isValidating}
            setActivePlaceIndex={setActivePlaceIndex}
            clearGeoPoints={clearGeoPoints}
          />
        </BottomSheet>
        <Places
          visible={activePlaceIndex !== undefined && !expandActivePlace}
          map={map}
          activePlaceIndex={activePlaceIndex}
          places={geoPoints}
          setActivePlaceIndex={setActivePlaceIndex}
          setExpandActivePlace={setExpandActivePlace}
        />
        <BottomSheet open={expandActivePlace} onDismiss={onDismiss}>
          <Place place={activePlace} />
        </BottomSheet>
      </div>
    </div>
  )
}
