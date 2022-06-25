import useSWR from 'swr'
import { routes } from 'shared/api'

export const useCollections = () => {
  return useSWR<Paths.CollectionsControllerFindAll.Responses.$200>(
    routes.collections
  )
}
