import { Rate, Tag, Typography } from 'antd'
import { AddToCollectionModal } from 'widgets/place/ui/add-to-collection-modal/add-to-collection-modal'

import styles from 'widgets/place/ui/place/place.module.scss'
import { useBoolean } from 'shared/hooks'
import { usePlaceCollections } from 'entities/places/lib'

interface PointProps {
  place?: Components.Schemas.CreatePlaceDto
}

export const Place = ({ place }: PointProps) => {
  const {
    value: isModalVisible,
    setIsTrue: showModal,
    setIsFalse: hideModal,
  } = useBoolean()

  const { data: placeCollections } = usePlaceCollections(place?.osmId)

  return (
    <>
      <div className={styles.infoWrapper}>
        <Typography.Paragraph>{place?.name}</Typography.Paragraph>
        <div className={styles.collectionsTitle}>
          <Typography.Title level={3} className={styles.blockTitle}>
            Коллекции
          </Typography.Title>
          <Typography.Link onClick={showModal}>Изменить</Typography.Link>
        </div>
        {!!placeCollections?.length ? (
          placeCollections?.map((collection) => (
            <Tag key={collection.id} className={styles.tag}>
              {collection.name}
            </Tag>
          ))
        ) : (
          <Typography.Paragraph>Не добавлена в коллекции</Typography.Paragraph>
        )}
        <AddToCollectionModal
          visible={isModalVisible}
          placeCollections={placeCollections || []}
          onCancel={hideModal}
          place={place}
        />
        <Typography.Title level={3} className={styles.blockTitle}>
          Отзывы
        </Typography.Title>
        <Rate />
      </div>
    </>
  )
}
