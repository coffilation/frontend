import useSWR from 'swr'
import { backendApi, backendRoutes } from 'shared/api'

export const usePlaces = (
  params?: Paths.PlacesControllerFindAll.QueryParameters | null,
) => {
  return useSWR<Paths.PlacesControllerFindAll.Responses.$200>(
    params === null ? null : [backendRoutes.places, { params }],
  )
}

export const usePlace = (placeOsmId: number | undefined) => {
  return useSWR<Paths.PlacesControllerFindOne.Responses.$200>(
    placeOsmId ? backendRoutes.place(placeOsmId) : null,
    {
      onErrorRetry: (error, key, config, revalidate, revalidateOptions) => {
        if (error?.response?.status !== 404) {
          revalidate(revalidateOptions)
        }
      },
    },
  )
}

export const putPlaceCollections = (
  placeId: number,
  data: Paths.PlacesControllerUpdatePlaceCollections.RequestBody,
) => {
  return backendApi.put<Paths.PlacesControllerUpdatePlaceCollections.Responses.$200>(
    backendRoutes.placeCollections(placeId),
    data,
  )
}
