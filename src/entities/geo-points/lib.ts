import useSWR from 'swr'
import { backendRoutes, searchRoutes, searchSWRFetcher } from 'shared/api'

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
  osmId: number | undefined,
  category: string | undefined,
) => {
  return useSWR<Components.Schemas.Place>(
    osmType && osmId && category
      ? [backendRoutes.placeByOsmData(osmId, osmType, category)]
      : null,
    searchSWRFetcher,
  )
}
