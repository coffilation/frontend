import { Menu } from 'antd'
import { CompassOutlined, UserOutlined } from '@ant-design/icons'

import styles from './tab-bar.module.scss'
import { generatePath, Link } from 'react-router-dom'
import { Path } from 'shared/config'

export const TabBar = () => {
  return (
    <Menu
      mode='horizontal'
      defaultSelectedKeys={[`collections`]}
      className={styles.tabs}
      items={[
        {
          key: `collections`,
          label: (
            <Link to={Path.Collections}>
              <CompassOutlined />
            </Link>
          ),
        },
        {
          key: `user`,
          label: (
            <Link to={generatePath(Path.User, { userId: `1` })}>
              <UserOutlined />
            </Link>
          ),
        },
      ]}
    />
  )
}
