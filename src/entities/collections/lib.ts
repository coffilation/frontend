import useSWR, { Key } from 'swr'
import { routes } from 'shared/api'

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
