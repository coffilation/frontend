import useSWR from 'swr'
import { backendRoutes } from 'shared/api'

export const useCollections = (
  params?: Paths.CollectionsControllerFindAll.QueryParameters | null,
) => {
  return useSWR<Paths.CollectionsControllerFindAll.Responses.$200>(
    params === null ? null : [backendRoutes.collections, { params }],
  )
}

export const useCollection = (
  collectionId: Paths.CollectionsControllerFindOne.Parameters.Id | null,
) => {
  return useSWR<Paths.CollectionsControllerFindOne.Responses.$200>(
    collectionId === null ? null : backendRoutes.collection(collectionId),
  )
}
