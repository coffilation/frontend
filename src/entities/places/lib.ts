import useSWR from 'swr'
import { backendApi, backendRoutes } from 'shared/api'

export const postPlace = (data: Paths.PlacesControllerCreate.RequestBody) => {
  return backendApi.post<Paths.PlacesControllerCreate.Responses.$201>(
    backendRoutes.places,
    data
  )
}

export const usePlaces = () => {
  return useSWR<Paths.PlacesControllerFindAll.Responses.$200>(
    backendRoutes.places,
    {
      onErrorRetry: (error, key, config, revalidate, revalidateOptions) => {
        if (error?.response?.status !== 404) {
          revalidate(revalidateOptions)
        }
      },
    }
  )
}

export const usePlace = (placeOsmId: number | undefined) => {
  return useSWR<Paths.PlacesControllerFindOne.Responses.$200>(
    placeOsmId ? backendRoutes.place(placeOsmId) : null
  )
}

export const putPlaceCollections = (
  placeId: number,
  data: Paths.PlacesControllerUpdatePlaceCollections.RequestBody
) => {
  return backendApi.put<Paths.PlacesControllerUpdatePlaceCollections.Responses.$200>(
    backendRoutes.placeCollections(placeId),
    data
  )
}
