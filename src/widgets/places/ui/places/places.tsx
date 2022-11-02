import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { generatePath, useNavigate } from 'react-router-dom'

import { Path } from 'shared/config'

import { usePlacesDrag, usePlacesSwipe } from '../../lib'

import styles from './places.module.scss'
import { useMapContext } from 'features/map-context/lib'
import { useBoolean } from 'shared/hooks'

const ANIMATION_TIMEOUT_MS = 300

export const Places = () => {
  const places = useMapContext((contextValue) => contextValue.places)
  const navigate = useNavigate()
  const [activePlaceIndex, setActivePlaceIndex] = useState<number>()
  const { value: isPlacesVisible, setIsFalse: hidePlaces } = useBoolean(true)
  const { setSwiper } = usePlacesSwipe({ activePlaceIndex })

  const handleOpenDiscovery = useCallback(() => {
    navigate(generatePath(Path.Map))
  }, [navigate])

  const { bind, offset } = usePlacesDrag({
    onClose: handleOpenDiscovery,
  })

  const handleExpandActivePlace = useCallback(() => {
    if (!places || activePlaceIndex === undefined) {
      return
    }

    hidePlaces()

    setTimeout(
      () =>
        navigate({
          pathname: generatePath(Path.MapPlace, {
            osmId: places[activePlaceIndex].osmId.toString(),
            osmType: places[activePlaceIndex].osmType.toString(),
          }),
        }),
      ANIMATION_TIMEOUT_MS,
    )
  }, [activePlaceIndex, hidePlaces, navigate, places])

  useEffect(() => {
    if (!places) {
      navigate(generatePath(Path.Map))
    }
  }, [navigate, places])

  useEffect(() => {
    if (activePlaceIndex === undefined) {
      setActivePlaceIndex(0)
    }
  }, [activePlaceIndex])

  return (
    <>
      <CSSTransition
        in={isPlacesVisible}
        appear
        classNames={{
          appear: styles.wrapperEnter,
          appearActive: styles.wrapperEnterActive,
          exitActive: styles.wrapperExitActive,
        }}
        timeout={ANIMATION_TIMEOUT_MS}
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
    </>
  )
}
