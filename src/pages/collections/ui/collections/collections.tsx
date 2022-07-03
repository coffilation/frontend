import { Card, PageHeader } from 'antd'
import { useCollections } from 'entities/collections/lib'

import styles from './collections.module.scss'
import { generatePath, Link } from 'react-router-dom'
import { Path } from 'shared/config'

export const CollectionsPage = () => {
  const { data: collections } = useCollections()

  return (
    <>
      <PageHeader title='Коллекции' />
      <div className={styles.wrapper}>
        {collections?.map((collection) => (
          <Link
            key={collection.id}
            to={generatePath(Path.Collection, {
              collectionId: collection.id.toString(),
            })}
          >
            <Card>{collection.name}</Card>
          </Link>
        ))}
      </div>
    </>
  )
}
