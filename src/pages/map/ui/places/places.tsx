import { Swiper as SwiperClass } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './places.module.scss'
import { Card, Typography } from 'antd'
import { centerMap } from 'pages/map/lib/center-map'
import { Map } from 'leaflet'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useDrag } from '@use-gesture/react'
import { CSSTransition } from 'react-transition-group'

interface PlacesProps {
  places?: Components.Schemas.Place[]
  activePlaceIndex?: number
  setActivePlaceIndex: Dispatch<SetStateAction<number | undefined>>
  map?: Map
  setExpandActivePlace: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const PLACE_TILE_HEIGHT = 238

export const Places = ({
  places,
  activePlaceIndex,
  map,
  setActivePlaceIndex,
  setExpandActivePlace,
  visible,
}: PlacesProps) => {
  const [offset, setOffset] = useState(0)
  const [swiper, setSwiper] = useState<SwiperClass>()

  const bind = useDrag(({ delta: [, deltaY], down }) => {
    setOffset((offsetPrevious) => {
      const expectedStickingOut = offsetPrevious + deltaY

      if (down) {
        return Math.max(0, Math.min(PLACE_TILE_HEIGHT, expectedStickingOut))
      } else {
        const stickingOutBreakpoints = [0, PLACE_TILE_HEIGHT]

        return stickingOutBreakpoints.reduce((prev, curr) =>
          Math.abs(curr - expectedStickingOut) <
          Math.abs(prev - expectedStickingOut)
            ? curr
            : prev,
        )
      }
    })
  })

  useEffect(() => {
    if (activePlaceIndex !== undefined && places?.[activePlaceIndex] && map) {
      const place = places[activePlaceIndex]

      centerMap(map, place.latitude, place.longitude, -80)
    }
  }, [activePlaceIndex, map, places])

  useEffect(() => {
    if (offset === PLACE_TILE_HEIGHT) {
      setActivePlaceIndex(undefined)
    }
  }, [offset, setActivePlaceIndex])

  useEffect(() => {
    if (!visible) {
      setOffset(0)
      setSwiper(undefined)
    }
  }, [visible])

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

  const handleExpandActivePlace = useCallback(
    () => setExpandActivePlace(true),
    [setExpandActivePlace],
  )

  return (
    <CSSTransition
      unmountOnExit
      appear
      in={visible}
      classNames={{
        enter: styles.wrapperEnter,
        enterActive: styles.wrapperEnterActive,
        exitActive: styles.wrapperExitActive,
      }}
      timeout={300}
    >
      <div
        {...bind()}
        style={{ transform: `translateY(${offset}px)` }}
        className={styles.wrapper}
      >
        <Swiper
          onSwiper={setSwiper}
          className={styles.list}
          spaceBetween={12}
          slidesPerView={1}
          onSlideChange={({ realIndex }) => setActivePlaceIndex(realIndex)}
        >
          {places?.map((place) => (
            <SwiperSlide key={place.osmId} onClick={handleExpandActivePlace}>
              <Card>
                <Typography.Title level={4}>{place.name}</Typography.Title>
                <Typography.Paragraph className={styles.paragraph}>
                  {place.displayName}
                </Typography.Paragraph>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </CSSTransition>
  )
}
