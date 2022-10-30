import { useUsersMe } from 'entities/users/lib'

import styles from './profile.module.scss'
import { Button, Card, Typography } from 'antd'
// import { useCollections } from 'entities/collections/lib'
import { useHandleLogout } from 'pages/user/lib/use-handle-logout'

export const Profile = () => {
  const { data: me } = useUsersMe()
  // const { data: collections } = useCollections({ authorId: me?.id })
  const { handleLogout } = useHandleLogout()

  return (
    <div className={styles.wrapper}>
      {me?.username}
      <Typography.Title level={4}>Коллекции</Typography.Title>
      <div className={styles.collections}>
        {/*{collections?.map((collection) => (*/}
        {/*  <Card key={collection.id}>{collection.name}</Card>*/}
        {/*))}*/}
      </div>
      <Button block danger className={styles.button} onClick={handleLogout}>
        Выход
      </Button>
    </div>
  )
}
