import { Button, Input, List, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useGeoPointsSearch } from '../../lib'
import { useBoolean } from 'shared/hooks'

import styles from './search.module.scss'
import { Dispatch, SetStateAction, useCallback } from 'react'

interface SearchProps extends ReturnType<typeof useGeoPointsSearch> {
  setActiveGeoPointIndex: Dispatch<SetStateAction<number | undefined>>
  hasActiveGeoPointIndex: boolean
}

export const Search = ({
  handleSearch,
  isValidating,
  geoPoints,
  setActiveGeoPointIndex,
  hasActiveGeoPointIndex,
  clearGeoPoints,
}: SearchProps) => {
  const {
    value: isBackdropVisible,
    setIsTrue: showBackdrop,
    setIsFalse: hideBackdrop,
  } = useBoolean()

  const getHandleClick = useCallback(
    (pointIndex: number) => () => {
      setActiveGeoPointIndex(pointIndex)
      hideBackdrop()
    },
    [hideBackdrop, setActiveGeoPointIndex]
  )

  const cancelSearch = useCallback(() => {
    clearGeoPoints()
    setActiveGeoPointIndex(undefined)
  }, [clearGeoPoints, setActiveGeoPointIndex])

  return (
    <>
      <div
        className={isBackdropVisible ? styles.backdrop : styles.backdropHidden}
      />
      <div className={styles.searchWrapper}>
        <Button
          size='large'
          className={
            isBackdropVisible || hasActiveGeoPointIndex
              ? styles.backButton
              : styles.backButtonHidden
          }
          onClick={
            hasActiveGeoPointIndex && !isBackdropVisible
              ? cancelSearch
              : hideBackdrop
          }
        >
          <ArrowLeftOutlined />
        </Button>
        <Input.Search
          size='large'
          loading={isValidating}
          onSearch={handleSearch}
          onFocus={showBackdrop}
        />
      </div>
      {isBackdropVisible && !isValidating && (
        <List>
          {geoPoints?.map((geoPoint, index) => (
            <List.Item
              className={styles.listItem}
              key={geoPoint.osm_id}
              onClick={getHandleClick(index)}
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
