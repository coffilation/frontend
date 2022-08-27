import { postPlace, putPlaceCollections, usePlace } from 'entities/places/lib'
import { useCallback } from 'react'
import { mutate } from 'swr'
import { routes } from 'shared/api'

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
        const newPlace = (await postPlace(place)).data
        await mutate<Components.Schemas.Place[]>(
          routes.places,
          (places) => (places ? [...places, newPlace] : undefined),
          false
        )
      }

      await putPlaceCollections(place.osmId, placeCollectionIds)
    },
    [place, isPlaceValidating, placeError?.response?.status]
  )

  return { handleEditPlaceCollections }
}
