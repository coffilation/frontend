import { ComponentType } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import styles from './routing.module.scss'

export type Paths = {
  path: string
  component: ComponentType
  default?: boolean
}[]

interface Props {
  paths: Paths
}

export const Routing = ({ paths }: Props) => {
  const location = useLocation()

  const defaultPath = paths.find((route) => route.default)?.path

  console.log(defaultPath)

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exit: styles.exit,
          exitActive: styles.exitActive,
        }}
        timeout={300}
      >
        <Routes location={location}>
          {paths.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <div className={styles.wrapper}>
                  <route.component />
                </div>
              }
            />
          ))}
          {defaultPath && (
            <Route path='*' element={<Navigate to={defaultPath} replace />} />
          )}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}
