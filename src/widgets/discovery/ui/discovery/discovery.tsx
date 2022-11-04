import { Search } from '../search'
import { BottomSheet } from 'shared/ui'
import { useCallback, useEffect, useState } from 'react'
import { useGeoPointsSearch } from '../../lib'
import { generatePath, useNavigate } from 'react-router-dom'
import { Path } from 'shared/config'
import { useMapContext } from 'features/map-context/lib'

export const Discovery = () => {
  const navigate = useNavigate()
  const setPlaces = useMapContext((contextValue) => contextValue.setPlaces)
  const { handleSearch, isValidating, geoPoints, clearGeoPoints, query } =
    useGeoPointsSearch()

  const [activePlaceOsmId, setActivePlaceOsmId] = useState<number>()
  const [isBottomSheetClosed, setIsBottomSheetClosed] = useState(false)

  useEffect(() => {
    if (isBottomSheetClosed && setPlaces) {
      setPlaces(geoPoints)
      navigate(generatePath(Path.MapPlaces, { query }))
    }
  }, [geoPoints, isBottomSheetClosed, navigate, query, setPlaces])

  const handleClose = useCallback(() => {
    setIsBottomSheetClosed(true)
  }, [])

  return (
    <BottomSheet open={!activePlaceOsmId} onClose={handleClose}>
      <Search
        handleSearch={handleSearch}
        geoPoints={geoPoints}
        isValidating={isValidating}
        setActivePlaceOsmId={setActivePlaceOsmId}
        clearGeoPoints={clearGeoPoints}
      />
    </BottomSheet>
  )
}
