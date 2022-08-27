import { useMap } from 'react-leaflet'
import { useCallback } from 'react'
import { Button } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

import styles from './controls.module.scss'

export const Controls = () => {
  const map = useMap()

  const handleZoomIn = useCallback(() => map.zoomIn(), [map])
  const handleZoomOut = useCallback(() => map.zoomOut(), [map])

  return (
    <div className={styles.wrapper}>
      <Button icon={<PlusOutlined onClick={handleZoomIn} />} />
      <Button icon={<MinusOutlined onClick={handleZoomOut} />} />
    </div>
  )
}
