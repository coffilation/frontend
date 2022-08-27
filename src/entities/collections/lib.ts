import useSWR, { Key } from 'swr'
import { api, routes } from 'shared/api'

export const useCollections = (
  params?: Paths.CollectionsControllerFindAll.QueryParameters
) => {
  let key: Key = null

  if (!params) {
    key = routes.collections
  }

  if (params && params.authorId) {
    key = [routes.collections, { params }]
  }

  return useSWR<Paths.CollectionsControllerFindAll.Responses.$200>(key)
}

export const postCollectionAddPlaces = (
  collectionId: number,
  data: Paths.CollectionsControllerAddPlaces.RequestBody
) => {
  return api.post<Paths.CollectionsControllerAddPlaces.Responses.$201>(
    routes.collectionAddPlaces(collectionId),
    data
  )
}

export const postCollectionRemovePlaces = (
  collectionId: number,
  data: Paths.CollectionsControllerAddPlaces.RequestBody
) => {
  return api.post<Paths.CollectionsControllerRemovePlaces.Responses.$201>(
    routes.collectionRemovePlaces(collectionId),
    data
  )
}
