import { PageHeader } from 'antd'
import { useAuthContext } from 'processes/auth/lib'
import { Profile } from '../profile/profile'
import { Login } from '../login/login'

export const UserPage = () => {
  const { isLoading, isAuthorized } = useAuthContext()

  if (isLoading) {
    return null
  }

  return (
    <>
      <PageHeader title='Профиль' />
      {isAuthorized ? <Profile /> : <Login />}
    </>
  )
}
