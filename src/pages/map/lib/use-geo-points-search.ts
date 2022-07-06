import { useCallback, useState } from 'react'
import { useGeoPoints } from 'entities/geo-points/lib'

export const useGeoPointsSearch = () => {
  const [query, setQuery] = useState<string>()
  const { data: geoPoints, isValidating } = useGeoPoints(query)

  const clearGeoPoints = useCallback(() => {
    setQuery(undefined)
  }, [])

  return { handleSearch: setQuery, geoPoints, isValidating, clearGeoPoints }
}
