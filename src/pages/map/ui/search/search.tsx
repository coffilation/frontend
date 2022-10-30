import { Input, List, Typography } from 'antd'
import { useGeoPointsSearch } from '../../lib'

import styles from './search.module.scss'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { Map as LeafletMap } from 'leaflet'

interface SearchProps extends ReturnType<typeof useGeoPointsSearch> {
  setActivePlaceIndex: Dispatch<SetStateAction<number | undefined>>
  map: LeafletMap | undefined
}

export const Search = ({
  handleSearch,
  isValidating,
  geoPoints,
  setActivePlaceIndex,
  map,
}: SearchProps) => {
  const getHandleClick = useCallback(
    (index: number) => () => {
      setActivePlaceIndex(index)
    },
    [setActivePlaceIndex],
  )

  const handleSearchClick = useCallback(
    (value: string) => {
      if (!map) {
        return
      }

      const bounds = map.getBounds()

      handleSearch(value, [
        bounds.getWest(),
        bounds.getNorth(),
        bounds.getEast(),
        bounds.getSouth(),
      ])
    },
    [map, handleSearch],
  )

  return (
    <>
      <div className={styles.searchWrapper}>
        <Input.Search loading={isValidating} onSearch={handleSearchClick} />
      </div>
      {geoPoints && !isValidating && (
        <List className={styles.list}>
          {geoPoints?.map((geoPoint, index) => (
            <List.Item
              className={styles.listItem}
              key={geoPoint.osmId}
              onClick={getHandleClick(index)}
            >
              <Typography.Paragraph className={styles.listItemTitle}>
                {geoPoint.name}
              </Typography.Paragraph>
              {geoPoint.displayName}
            </List.Item>
          ))}
        </List>
      )}
    </>
  )
}
