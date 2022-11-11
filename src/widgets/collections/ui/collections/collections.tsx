import styles from './collections.module.scss'
import { generatePath, Link, useLocation } from 'react-router-dom'
import { Path } from 'shared/config'
import { Card, Typography } from 'antd'
import { useMemo } from 'react'
import { useCollections } from 'entities/collections/lib'

interface CollectionsProps {
  userId: number | undefined
  className?: string
}

export const Collections = ({ userId, className }: CollectionsProps) => {
  const location = useLocation()
  const { data: collections } = useCollections(userId ? { userId } : null)

  const fromSearchParam = useMemo(() => {
    return new URLSearchParams({ from: location.pathname }).toString()
  }, [location.pathname])

  return (
    <div className={className}>
      <Typography.Title level={5}>Коллекции</Typography.Title>
      <div className={styles.collections}>
        {collections?.map((collection) => (
          <Link
            key={collection.id}
            to={{
              pathname: generatePath(Path.Collection, {
                collectionId: collection.id.toString(),
              }),
              search: fromSearchParam,
            }}
          >
            <Card>{collection.name}</Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
