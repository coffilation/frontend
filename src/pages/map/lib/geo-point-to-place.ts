import { GeoPoint } from 'entities/geo-points/lib'

export const geoPointToPlace = (
  geoPoint: GeoPoint
): Components.Schemas.CreatePlaceDto => ({
  osmId: geoPoint.osm_id,
  latitude: parseFloat(geoPoint.lat),
  longitude: parseFloat(geoPoint.lon),
  name: geoPoint.display_name,
})
