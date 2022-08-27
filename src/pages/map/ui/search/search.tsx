import { Button, Input, List, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useGeoPointsSearch } from '../../lib'
import { useBoolean } from 'shared/hooks'

import styles from './search.module.scss'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { GeoPoint } from 'entities/geo-points/lib'

interface SearchProps extends ReturnType<typeof useGeoPointsSearch> {
  setActiveGeoPoint: Dispatch<SetStateAction<GeoPoint | undefined>>
  hasActiveGeoPoint: boolean
}

export const Search = ({
  handleSearch,
  isValidating,
  geoPoints,
  setActiveGeoPoint,
  hasActiveGeoPoint,
  clearGeoPoints,
}: SearchProps) => {
  const {
    value: isBackdropVisible,
    setIsTrue: showBackdrop,
    setIsFalse: hideBackdrop,
  } = useBoolean()

  const getHandleClick = useCallback(
    (geoPoint: GeoPoint) => () => {
      setActiveGeoPoint(geoPoint)
      hideBackdrop()
    },
    [hideBackdrop, setActiveGeoPoint]
  )

  const cancelSearch = useCallback(() => {
    clearGeoPoints()
    setActiveGeoPoint(undefined)
  }, [clearGeoPoints, setActiveGeoPoint])

  return (
    <>
      <div
        className={isBackdropVisible ? styles.backdrop : styles.backdropHidden}
      />
      <div className={styles.searchWrapper}>
        <Button
          className={
            isBackdropVisible || hasActiveGeoPoint
              ? styles.backButton
              : styles.backButtonHidden
          }
          onClick={
            hasActiveGeoPoint && !isBackdropVisible
              ? cancelSearch
              : hideBackdrop
          }
        >
          <ArrowLeftOutlined />
        </Button>
        <Input.Search
          loading={isValidating}
          onSearch={handleSearch}
          onFocus={showBackdrop}
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
