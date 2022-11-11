import { useCollections } from 'entities/collections/lib'
import { Typography } from 'antd'

import styles from './public-collections.module.scss'
import React, { useRef } from 'react'
import { BottomSheet } from 'shared/ui'

export const PublicCollections = () => {
  const { data: collections } = useCollections()
  const listRef = useRef<HTMLUListElement>(null)

  return (
    <>
      <Typography.Title level={5} className={styles.title}>
        Находки
      </Typography.Title>
      <BottomSheet.ScrollableContainer>
        <ul ref={listRef} className={styles.list}>
          {collections?.map((collection) => (
            <li className={styles.item} key={collection.id}>
              <span className={styles.itemContent}>{collection.name}</span>
            </li>
          ))}
        </ul>
      </BottomSheet.ScrollableContainer>
    </>
  )
}
