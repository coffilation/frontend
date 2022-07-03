import { useState } from 'react'
import { useGeoPoints } from 'entities/geo-points/lib'

export const useGeoPointsSearch = () => {
  const [query, setQuery] = useState<string>()
  const { data: geoPoints, isValidating } = useGeoPoints(query)

  return { handleSearch: setQuery, geoPoints, isValidating }
}
