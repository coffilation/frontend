import useSWR from 'swr'
import { routes } from 'shared/api'
import { useAuthContext } from 'processes/auth/lib'

export const useUsersMe = () => {
  const { isLoading, isAuthorized } = useAuthContext()

  return useSWR<Paths.UsersControllerFindMe.Responses.$200>(
    !isLoading && isAuthorized ? routes.usersMe : null
  )
}
