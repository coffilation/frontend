import { Button, Checkbox, Form, Modal } from 'antd'
import { ComponentProps, useMemo } from 'react'
// import { useCollections } from 'entities/collections/lib'

import styles from './add-to-collection-modal.module.scss'
import { useEditPlaceCollections } from 'widgets/place/lib/use-edit-place-collections'

interface AddToCollectionModalProps
  extends Pick<ComponentProps<typeof Modal>, `visible` | `onCancel`> {
  placeCollections: Components.Schemas.Collection[]
  place: Components.Schemas.CreatePlaceDto | undefined
}

export const AddToCollectionModal = ({
  visible,
  onCancel,
  placeCollections,
  place,
}: AddToCollectionModalProps) => {
  // const { data: collections } = useCollections()
  const { handleEditPlaceCollections } = useEditPlaceCollections(place)

  const [form] = Form.useForm()

  // const checkboxes = useMemo(
  //   () =>
  //     collections?.map((collection) => (
  //       <Checkbox
  //         className={styles.checkbox}
  //         key={collection.id}
  //         value={collection.id}
  //         defaultChecked={placeCollections.some(
  //           (placeCollection) => placeCollection.id === collection.id
  //         )}
  //       >
  //         {collection.name}
  //       </Checkbox>
  //     )),
  //   [collections, placeCollections]
  // )

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title='Добавить в коллекцию'
      footer={[
        <Button key='save' type='primary' onClick={form.submit}>
          Сохранить
        </Button>,
      ]}
    >
      <Form onFinish={handleEditPlaceCollections} form={form}>
        <Form.Item name='collectionIds'>
          <Checkbox.Group className={styles.wrapper}>
            {/*{checkboxes}*/}
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
