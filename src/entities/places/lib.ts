import useSWR from 'swr'
import { api, routes } from 'shared/api'

export const postPlace = (data: Paths.PlacesControllerCreate.RequestBody) => {
  return api.post<Paths.PlacesControllerCreate.Responses.$201>(
    routes.places,
    data
  )
}

export const usePlaces = () => {
  return useSWR<Paths.PlacesControllerFindAll.Responses.$200>(routes.places, {
    onErrorRetry: (error, key, config, revalidate, revalidateOptions) => {
      if (error?.response?.status !== 404) {
        revalidate(revalidateOptions)
      }
    },
  })
}

export const usePlace = (placeOsmId: number | undefined) => {
  return useSWR<Paths.PlacesControllerFindOne.Responses.$200>(
    placeOsmId ? routes.place(placeOsmId) : null
  )
}

export const usePlaceCollections = (placeOsmId?: number) => {
  return useSWR<Paths.PlacesControllerFindPlaceCollections.Responses.$200>(
    placeOsmId ? routes.placeCollections(placeOsmId) : null,
    {
      onErrorRetry: (error, key, config, revalidate, revalidateOptions) => {
        if (error?.response?.status !== 404) {
          revalidate(revalidateOptions)
        }
      },
    }
  )
}

export const putPlaceCollections = (
  placeId: number,
  data: Paths.PlacesControllerUpdatePlaceCollections.RequestBody
) => {
  return api.put<Paths.PlacesControllerUpdatePlaceCollections.Responses.$200>(
    routes.placeCollections(placeId),
    data
  )
}
