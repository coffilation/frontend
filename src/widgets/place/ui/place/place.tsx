import { Rate, Typography } from 'antd'

import styles from './place.module.scss'
import { useBoolean } from 'shared/hooks'
import { BottomSheet } from 'shared/ui'
import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Path } from 'shared/config'
import { useGeoPoint } from 'entities/geo-points/lib'

type PlaceQuery = {
  osmType: string
  osmId: string
}

export const Place = () => {
  const { osmType, osmId } = useParams<PlaceQuery>()
  const { data: place } = useGeoPoint(osmType, osmId)

  const navigate = useNavigate()
  const {
    // value: isModalVisible,
    setIsTrue: showModal,
    // setIsFalse: hideModal,
  } = useBoolean()

  // const { data: placeCollections } = usePlaceCollections(place?.osmId)

  const handleClosePlace = useCallback(() => {
    navigate(Path.Map)
  }, [navigate])

  return (
    <BottomSheet open closeable onClose={handleClosePlace}>
      <div className={styles.infoWrapper}>
        <Typography.Title level={4} className={styles.blockTitle}>
          {place?.name}
        </Typography.Title>
        <Typography.Paragraph>{place?.displayName}</Typography.Paragraph>
        <div className={styles.collectionsTitle}>
          <Typography.Title level={3} className={styles.blockTitle}>
            Коллекции
          </Typography.Title>
          <Typography.Link onClick={showModal}>Изменить</Typography.Link>
        </div>
        {/*{!!placeCollections?.length ? (*/}
        {/*  placeCollections?.map((collection) => (*/}
        {/*    <Tag key={collection.id} className={styles.tag}>*/}
        {/*      {collection.name}*/}
        {/*    </Tag>*/}
        {/*  ))*/}
        {/*) : (*/}
        {/*  <Typography.Paragraph>Не добавлена в коллекции</Typography.Paragraph>*/}
        {/*)}*/}
        {/*<AddToCollectionModal*/}
        {/*  visible={isModalVisible}*/}
        {/*  placeCollections={placeCollections || []}*/}
        {/*  onCancel={hideModal}*/}
        {/*  place={place}*/}
        {/*/>*/}
        <Typography.Title level={3} className={styles.blockTitle}>
          Отзывы
        </Typography.Title>
        <Rate />
      </div>
    </BottomSheet>
  )
}
