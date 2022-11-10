import { useUser, useUserId } from 'entities/users/lib'

import styles from './profile.module.scss'
import { PageHeader, Typography, Card, Button } from 'antd'
import { useHandleLogout } from 'pages/login/lib/use-handle-logout'
import { useCollections } from 'entities/collections/lib'
import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Path } from 'shared/config'

type ProfileQuery = {
  username: string
}

export const Profile = () => {
  const navigate = useNavigate()
  const { username } = useParams<ProfileQuery>()
  const { data: userIdData } = useUserId(username || null)
  const { data: user } = useUser(userIdData?.id || null)
  const { data: collections } = useCollections(
    user ? { userId: user.id } : null,
  )
  const { handleLogout } = useHandleLogout()

  const handleBack = useCallback(() => {
    navigate(Path.Map)
  }, [navigate])

  return (
    <>
      <PageHeader title={user?.username} onBack={handleBack} />
      <div className={styles.wrapper}>
        <Typography.Title level={4}>Коллекции</Typography.Title>
        <div className={styles.collections}>
          {collections?.map((collection) => (
            <Card key={collection.id}>{collection.name}</Card>
          ))}
        </div>
        <Button block danger className={styles.button} onClick={handleLogout}>
          Выход
        </Button>
      </div>
    </>
  )
}
