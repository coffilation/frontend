import { useUser, useUserId } from 'entities/users/lib'

import styles from './profile.module.scss'
import { PageHeader, Button } from 'antd'
import { useHandleLogout } from 'pages/login/lib/use-handle-logout'
import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Path } from 'shared/config'
import { Collections } from 'widgets/collections/ui'

type ProfileQuery = {
  username: string
}

export const Profile = () => {
  const navigate = useNavigate()
  const { username } = useParams<ProfileQuery>()
  const { data: userIdData } = useUserId(username || null)
  const { data: user } = useUser(userIdData?.id || null)
  const { handleLogout } = useHandleLogout()

  const handleBack = useCallback(() => {
    navigate(Path.Map)
  }, [navigate])

  return (
    <>
      <PageHeader title={user?.username} onBack={handleBack} />
      <div className={styles.wrapper}>
        <Collections userId={user?.id} />
        <Button block danger className={styles.button} onClick={handleLogout}>
          Выход
        </Button>
      </div>
    </>
  )
}
