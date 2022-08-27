import { Button, Rate, Tag, Typography } from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { AddToCollectionModal } from 'widgets/place/ui/add-to-collection-modal/add-to-collection-modal'

import styles from 'widgets/place/ui/place/place.module.scss'
import { GeoPoint } from 'entities/geo-points/lib'
import { useBoolean } from 'shared/hooks'
import { usePlace, usePlaceCollections } from 'entities/places/lib'

interface PointProps {
  geoPoint?: GeoPoint
}

export const Place = ({ geoPoint }: PointProps) => {
  const {
    value: isModalVisible,
    setIsTrue: showModal,
    setIsFalse: hideModal,
  } = useBoolean()

  const { data: placeCollections, isValidating: isPlaceCollectionsValidating } =
    usePlaceCollections(geoPoint?.osm_id)

  return (
    <>
      <div className={styles.infoWrapper}>
        <Typography.Paragraph>{geoPoint?.display_name}</Typography.Paragraph>
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
          isPlaceCollectionsValidating={isPlaceCollectionsValidating}
          onCancel={hideModal}
          geoPoint={geoPoint}
        />
        <Typography.Title level={3} className={styles.blockTitle}>
          Отзывы
        </Typography.Title>
        <Rate />
      </div>
    </>
  )
}
