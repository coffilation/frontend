import useSWR from 'swr'
import { backendRoutes } from 'shared/api'

export const useCollections = (
  params?: Paths.CollectionsControllerFindAll.QueryParameters | null,
) => {
  return useSWR<Paths.CollectionsControllerFindAll.Responses.$200>(
    params === null ? null : [backendRoutes.collections, { params }],
  )
}
