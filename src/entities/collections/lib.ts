import useSWR  from 'swr'
import { backendRoutes } from 'shared/api'

export const useCollections = (
  params?: Paths.CollectionsControllerFindAll.QueryParameters
) => {
  return useSWR<Paths.CollectionsControllerFindAll.Responses.$200>([
    backendRoutes.collections,
    { params },
  ])
}
