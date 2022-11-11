import { useUser, useUserId, useUsersMe } from 'entities/users/lib'

import styles from './profile.module.scss'
import { PageHeader } from 'antd'
import { useHandleLogout } from 'pages/login/lib/use-handle-logout'
import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Path } from 'shared/config'
import { Collections } from 'widgets/collections/ui'
import { LogoutOutlined } from '@ant-design/icons'

type ProfileQuery = {
  username: string
}

export const Profile = () => {
  const navigate = useNavigate()
  const { username } = useParams<ProfileQuery>()
  const { data: userIdData } = useUserId(username || null)
  const { data: user } = useUser(userIdData?.id || null)
  const { data: usersMe } = useUsersMe()
  const { handleLogout } = useHandleLogout()

  const handleBack = useCallback(() => {
    navigate(Path.Map)
  }, [navigate])

  return (
    <>
      <PageHeader
        title={user?.username}
        onBack={handleBack}
        className={styles.header}
        extra={
          usersMe?.username === username && (
            <LogoutOutlined className={styles.logout} onClick={handleLogout} />
          )
        }
      />
      <div className={styles.wrapper}>
        <Collections userId={user?.id} />
      </div>
    </>
  )
}
