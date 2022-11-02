import { Avatar, Input, List, Typography } from 'antd'
import { useGeoPointsSearch } from '../../lib'

import styles from './search.module.scss'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { useMapContext } from 'features/map-context/lib'

interface SearchProps
  extends Omit<ReturnType<typeof useGeoPointsSearch>, `query`> {
  setActivePlaceOsmId: Dispatch<SetStateAction<number | undefined>>
}

export const Search = ({
  handleSearch,
  isValidating,
  geoPoints,
  setActivePlaceOsmId,
}: SearchProps) => {
  const map = useMapContext((value) => value.map)

  const getHandleClick = useCallback(
    (osmId: number) => () => {
      setActivePlaceOsmId(osmId)
    },
    [setActivePlaceOsmId],
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
        <Avatar icon={<UserOutlined />} size='large' shape='square' />
      </div>
      {geoPoints && !isValidating && (
        <List className={styles.list}>
          {geoPoints?.map((geoPoint) => (
            <List.Item
              className={styles.listItem}
              key={geoPoint.osmId}
              onClick={getHandleClick(geoPoint.osmId)}
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
