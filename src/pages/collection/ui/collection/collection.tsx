import { PageHeader } from 'antd'
import { Map } from 'widgets/map/ui/map/map'

import styles from './collection.module.scss'

export const CollectionPage = () => {
  return (
    <>
      <PageHeader title='Коллекция' className={styles.header} />
      <Map />
    </>
  )
}
