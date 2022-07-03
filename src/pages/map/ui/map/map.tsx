import { Map } from 'widgets/map/ui/map/map'
import { Search } from '../search'

import styles from './map.module.scss'

export const MapPage = () => {
  return (
    <div className={styles.wrapper}>
      <Map />

      <div className={styles.searchWrapper}>
        <Search />
      </div>
    </div>
  )
}
