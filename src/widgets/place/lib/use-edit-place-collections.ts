import { postPlace, putPlaceCollections, usePlace } from 'entities/places/lib'
import { useCallback } from 'react'
import { GeoPoint } from 'entities/geo-points/lib'
import { mutate } from 'swr'

export const useEditPlaceCollections = (geoPoint: GeoPoint | undefined) => {
  const { error: placeError, isValidating: isPlaceValidating } = usePlace(
    geoPoint?.osm_id
  )

  const handleEditPlaceCollections = useCallback(
    async (
      placeCollectionIds: Components.Schemas.UpdatePlaceCollectionsDto
    ) => {
      console.log(placeCollectionIds, geoPoint)

      if (!geoPoint || isPlaceValidating) {
        return
      }

      if (placeError?.response?.status === 404) {
        await postPlace({
          latitude: parseFloat(geoPoint.lat),
          longitude: parseFloat(geoPoint.lon),
          name: geoPoint.display_name,
          osmId: geoPoint.osm_id,
        })
      }

      await putPlaceCollections(geoPoint.osm_id, placeCollectionIds)
    },
    [geoPoint, isPlaceValidating, placeError?.response?.status]
  )

  return { handleEditPlaceCollections }
}
