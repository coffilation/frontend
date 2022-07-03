import useSWR from 'swr'
import { routes } from 'shared/api'

const defaultSearchParams = {
  format: `jsonv2`,
  addressdetails: 1,
  'accept-language': `ru`,
  namedetails: 1,
  countrycodes: `ru`,
}

interface GeoPoint {
  place_id: number
  licence: string
  osm_type: string
  osm_id: number
  boundingbox: [string, string, string, string]
  lat: string
  lon: string
  display_name: string
  place_rank: number
  category: string
  type: string
  importance: number
  icon: string
  address: {
    amenity: string
    road: string
    city_district: string
    city?: string
    town?: string
    'ISO3166-2-lvl15': string
    state: string
    'ISO3166-2-lvl4': string
    region: string
    postcode: string
    country: string
    country_code: string
  }
  namedetails: {
    name: string
  }
}

export const useGeoPoints = (search: string | undefined) => {
  console.log(search)
  return useSWR<GeoPoint[]>(
    search
      ? [routes.search, { params: { q: search, ...defaultSearchParams } }]
      : null
  )
}
