import { useUsersMe } from 'entities/users/lib'

export const Profile = () => {
  const { data: me } = useUsersMe()

  return <>{me?.username}</>
}
