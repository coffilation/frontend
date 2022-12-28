import { useCollections } from 'entities/collections/lib'
import { Typography } from 'antd'

import styles from './public-collections.module.scss'
import React, { useMemo, useRef } from 'react'
import { BottomSheet } from 'shared/ui'
import { generatePath, Link, useLocation } from 'react-router-dom'
import { Path } from 'shared/config'
import { gradientToBackground } from '../../lib'

export const PublicCollections = () => {
  const { data: collections } = useCollections()
  const listRef = useRef<HTMLUListElement>(null)
  const location = useLocation()

  const fromSearchParam = useMemo(() => {
    return new URLSearchParams({ from: location.pathname }).toString()
  }, [location.pathname])

  return (
    <>
      <Typography.Title level={5} className={styles.title}>
        Находки
      </Typography.Title>
      <BottomSheet.ScrollableContainer>
        <ul ref={listRef} className={styles.list}>
          {collections?.map((collection) => (
            <li className={styles.item} key={collection.id}>
              <Link
                to={{
                  pathname: generatePath(Path.Collection, {
                    collectionId: collection.id.toString(),
                  }),
                  search: fromSearchParam,
                }}
                className={styles.itemLink}
                style={{
                  background: gradientToBackground(collection.gradient),
                }}
              >
                <span className={styles.itemContent}>{collection.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </BottomSheet.ScrollableContainer>
    </>
  )
}
