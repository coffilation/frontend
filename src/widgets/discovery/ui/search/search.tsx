import { Avatar, Input, List, Typography } from 'antd'
import { useGeoPointsSearch } from '../../lib'

import styles from './search.module.scss'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { useMapContext } from 'features/map-context/lib'
import { generatePath, Link } from 'react-router-dom'
import { Path } from 'shared/config'
import { useUsersMe } from 'entities/users/lib'

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
  const { data: usersMe } = useUsersMe()

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
        <Link
          to={
            usersMe
              ? generatePath(Path.Profile, { username: usersMe.username })
              : Path.ProfileLogin
          }
        >
          <Avatar
            icon={
              usersMe ? usersMe.username.at(0)?.toUpperCase() : <UserOutlined />
            }
            size='large'
            shape='square'
          />
        </Link>
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
