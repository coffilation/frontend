import useSWR from 'swr'
import { searchRoutes, searchSWRFetcher } from 'shared/api'

export const useGeoPoints = (
  search: string | undefined,
  viewBox: number[] | undefined,
) => {
  return useSWR<Components.Schemas.Place[]>(
    search && viewBox
      ? [
          searchRoutes.search,
          { params: { q: search, viewbox: viewBox.join(`,`) } },
        ]
      : null,
    searchSWRFetcher,
  )
}

export const useGeoPoint = (
  osmType: string | undefined,
  osmId: string | undefined,
) => {
  return useSWR<Components.Schemas.Place>(
    osmType && osmId
      ? [searchRoutes.lookup, { params: { osmType, osmId } }]
      : null,
    searchSWRFetcher,
  )
}
