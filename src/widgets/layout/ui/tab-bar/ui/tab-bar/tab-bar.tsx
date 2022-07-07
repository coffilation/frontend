import { Menu } from 'antd'
import { CompassOutlined, UserOutlined } from '@ant-design/icons'

import styles from './tab-bar.module.scss'
import { generatePath, Link, useLocation } from 'react-router-dom'
import { Path } from 'shared/config'
import { useMemo } from 'react'

export const TabBar = () => {
  const { pathname } = useLocation()

  const currentLocation = useMemo(
    () => pathname.split(`/`).at(1) as string,
    [pathname]
  )

  const items = useMemo(() => {
    return [
      // {
      //   key: `collections`,
      //   label: (
      //     <Link to={Path.Collections}>
      //       <CompassOutlined />
      //     </Link>
      //   ),
      // },
      {
        key: `map`,
        label: (
          <Link to={Path.Map}>
            <CompassOutlined />
          </Link>
        ),
      },
      {
        key: `profile`,
        label: (
          <Link to={generatePath(Path.Profile)}>
            <UserOutlined />
          </Link>
        ),
      },
    ]
  }, [])

  return (
    <Menu
      mode='horizontal'
      defaultSelectedKeys={[currentLocation]}
      className={styles.tabs}
      items={items}
    />
  )
}
