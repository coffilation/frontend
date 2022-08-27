import { postPlace, putPlaceCollections, usePlace } from 'entities/places/lib'
import { useCallback } from 'react'

export const useEditPlaceCollections = (
  place: Components.Schemas.CreatePlaceDto | undefined
) => {
  const { error: placeError, isValidating: isPlaceValidating } = usePlace(
    place?.osmId
  )

  const handleEditPlaceCollections = useCallback(
    async (
      placeCollectionIds: Components.Schemas.UpdatePlaceCollectionsDto
    ) => {
      console.log(placeCollectionIds, place)

      if (!place || isPlaceValidating) {
        return
      }

      if (placeError?.response?.status === 404) {
        await postPlace(place)
      }

      await putPlaceCollections(place.osmId, placeCollectionIds)
    },
    [place, isPlaceValidating, placeError?.response?.status]
  )

  return { handleEditPlaceCollections }
}
