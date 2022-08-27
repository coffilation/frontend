import { Button, Modal } from 'antd'
import { ControlOutlined } from '@ant-design/icons'

import styles from './filters.module.scss'
import { useBoolean } from 'shared/hooks'

export const Filters = () => {
  const {
    value: isModalVisible,
    setIsTrue: showModal,
    setIsFalse: hideModal,
  } = useBoolean()

  return (
    <>
      <Button
        className={styles.button}
        icon={<ControlOutlined />}
        onClick={showModal}
      />
      <Modal title='Фильтры' visible={isModalVisible} onCancel={hideModal} />
    </>
  )
}
