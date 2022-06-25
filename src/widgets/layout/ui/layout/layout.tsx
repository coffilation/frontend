import { ReactNode } from 'react'
import { TabBar } from '../tab-bar/ui/tab-bar/tab-bar'

import styles from './layout.module.scss'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
      <TabBar />
    </div>
  )
}
