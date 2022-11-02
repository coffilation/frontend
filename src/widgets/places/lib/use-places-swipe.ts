import { useEffect, useState } from 'react'
import { centerMap } from 'pages/map/lib/center-map'
import { useMapContext } from 'features/map-context/lib'
import { Swiper } from 'swiper'

interface UsePlacesSwipeParams {
  activePlaceIndex?: number
}

export const usePlacesSwipe = ({ activePlaceIndex }: UsePlacesSwipeParams) => {
  const [swiper, setSwiper] = useState<Swiper>()
  const [places, map] = useMapContext((contextValue) => [
    contextValue.places,
    contextValue.map,
  ])

  useEffect(() => {
    if (activePlaceIndex !== undefined && places?.[activePlaceIndex] && map) {
      const place = places[activePlaceIndex]

      centerMap(map, place.latitude, place.longitude, -80)
    }
  }, [activePlaceIndex, map, places])

  useEffect(() => {
    if (
      activePlaceIndex !== undefined &&
      places &&
      activePlaceIndex < places.length &&
      swiper
    ) {
      swiper.slideTo(activePlaceIndex)
    }
  }, [activePlaceIndex, places, swiper])

  return { setSwiper }
}
