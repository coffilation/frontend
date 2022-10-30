import { Map } from 'leaflet'

export const centerMap = (
  map: Map,
  latitude: number,
  longitude: number,
  yOffset: number,
) => {
  const point = map.project([latitude, longitude])
  point.y -= yOffset

  map.flyTo(map.unproject(point), map.getZoom(), {
    animate: true,
    duration: 0.15,
  })
}
