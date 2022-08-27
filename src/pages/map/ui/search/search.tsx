import { Button, Input, List, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useGeoPointsSearch } from '../../lib'
import { useBoolean } from 'shared/hooks'

import styles from './search.module.scss'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { GeoPoint } from 'entities/geo-points/lib'
import { geoPointToPlace } from 'pages/map/lib/geo-point-to-place'

interface SearchProps extends ReturnType<typeof useGeoPointsSearch> {
  setActivePlace: Dispatch<
    SetStateAction<Components.Schemas.CreatePlaceDto | undefined>
  >
  hasActivePlace: boolean
}

export const Search = ({
  handleSearch,
  isValidating,
  geoPoints,
  setActivePlace,
  hasActivePlace,
  clearGeoPoints,
}: SearchProps) => {
  const {
    value: isBackdropVisible,
    setIsTrue: showBackdrop,
    setIsFalse: hideBackdrop,
  } = useBoolean()

  const getHandleClick = useCallback(
    (geoPoint: GeoPoint) => () => {
      setActivePlace(geoPointToPlace(geoPoint))
      hideBackdrop()
    },
    [hideBackdrop, setActivePlace]
  )

  const cancelSearch = useCallback(() => {
    clearGeoPoints()
    setActivePlace(undefined)
  }, [clearGeoPoints, setActivePlace])

  useEffect(() => {
    if (geoPoints) {
      showBackdrop()
    }
  }, [geoPoints, showBackdrop])

  return (
    <>
      <div
        className={isBackdropVisible ? styles.backdrop : styles.backdropHidden}
      />
      <div className={styles.searchWrapper}>
        <Button
          className={
            isBackdropVisible || hasActivePlace
              ? styles.backButton
              : styles.backButtonHidden
          }
          onClick={
            hasActivePlace && !isBackdropVisible ? cancelSearch : hideBackdrop
          }
        >
          <ArrowLeftOutlined />
        </Button>
        <Input.Search
          loading={isValidating}
          onSearch={handleSearch}
          onFocus={geoPoints && showBackdrop}
        />
      </div>
      {isBackdropVisible && !isValidating && (
        <List>
          {geoPoints?.map((geoPoint) => (
            <List.Item
              className={styles.listItem}
              key={geoPoint.osm_id}
              onClick={getHandleClick(geoPoint)}
            >
              <Typography.Paragraph className={styles.listItemTitle}>
                {geoPoint.namedetails.name}
              </Typography.Paragraph>
              {[
                geoPoint.address.road,
                geoPoint.address.city ||
                  geoPoint.address.town ||
                  geoPoint.address.state,
              ]
                .filter(Boolean)
                .join(`, `)}
            </List.Item>
          ))}
        </List>
      )}
    </>
  )
}
