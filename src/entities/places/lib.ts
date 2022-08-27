import useSWR  from 'swr'
import { api, routes } from 'shared/api'

export const postPlace = (data: Paths.PlacesControllerCreate.RequestBody) => {
  return api.post<Paths.PlacesControllerCreate.Responses.$201>(
    routes.places,
    data
  )
}

export const usePlaces = () => {
  return useSWR<Paths.CollectionsControllerFindAll.Responses.$200>(
    routes.places
  )
}

export const usePlace = (placeOsmId: number | undefined) => {
  return useSWR<Paths.PlacesControllerFindOne.Responses.$200>(
    placeOsmId ? routes.place(placeOsmId) : null
  )
}

export const usePlaceCollections = (placeOsmId?: number) => {
  return useSWR<Paths.PlacesControllerFindPlaceCollections.Responses.$200>(
    placeOsmId ? routes.placeCollections(placeOsmId) : null
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
