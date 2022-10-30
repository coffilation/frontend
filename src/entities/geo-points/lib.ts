import useSWR from 'swr'
import { searchRoutes, searchSWRFetcher } from 'shared/api'

export const useGeoPoints = (
  search: string | undefined,
  viewBox: [number, number, number, number] | undefined
) => {
  return useSWR<Components.Schemas.Place[]>(
    search && viewBox
      ? [
          searchRoutes.search,
          { params: { q: search, viewbox: viewBox.join(`,`) } },
        ]
      : null,
    searchSWRFetcher
  )
}
