import { useCallback, useState } from 'react'
import { useGeoPoints } from 'entities/geo-points/lib'

export const useGeoPointsSearch = () => {
  const [query, setQuery] = useState<string>()
  const [viewBox, setViewBox] = useState<[number, number, number, number]>()
  const { data: geoPoints, isValidating } = useGeoPoints(query, viewBox)

  const clearGeoPoints = useCallback(() => {
    setQuery(undefined)
  }, [])

  const handleSearch = useCallback(
    (value: string, viewBox: [number, number, number, number]) => {
      setQuery(value)
      setViewBox(viewBox)
    },
    []
  )

  return { handleSearch, geoPoints, isValidating, clearGeoPoints }
}
