import { usePlaces } from 'entities/places/lib'
import {
  generatePath,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { useCollection } from 'entities/collections/lib'
import { Card, Descriptions, PageHeader, Typography } from 'antd'
import { useCallback } from 'react'
import { Path } from 'shared/config'
import { useUsersMe } from 'entities/users/lib'

import styles from './collection.module.scss'

type CollectionQuery = {
  collectionId: string
}

export const Collection = () => {
  const { collectionId } = useParams<CollectionQuery>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { data: usersMe } = useUsersMe()

  const { data: collection } = useCollection(
    collectionId ? parseInt(collectionId) : null,
  )
  const { data: places } = usePlaces(
    collectionId ? { collectionId: parseInt(collectionId) } : null,
  )

  const handleBack = useCallback(() => {
    const fromSearchParam = searchParams.get(`from`)

    if (fromSearchParam) {
      navigate(fromSearchParam)
      return
    }

    if (usersMe) {
      navigate(generatePath(Path.Profile, { username: usersMe.username }))
    }
  }, [navigate, searchParams, usersMe])

  return (
    <>
      <PageHeader title={collection?.name} onBack={handleBack} />
      <div className={styles.wrapper}>
        <Descriptions>
          <Descriptions.Item label='Автор'>
            {collection?.author?.username}
          </Descriptions.Item>
        </Descriptions>
        <Typography.Paragraph>{collection?.description}</Typography.Paragraph>
        {places?.map((place) => (
          <Card key={place.osmId}>{place.name}</Card>
        ))}
      </div>
    </>
  )
}
