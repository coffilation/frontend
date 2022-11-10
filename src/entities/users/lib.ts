import useSWR from 'swr'
import { backendRoutes } from 'shared/api'
import { useUserAuth } from 'features/user-auth-context/lib'

export const useUsersMe = () => {
  const { isAuthorized } = useUserAuth()

  return useSWR<Paths.UsersControllerFindMe.Responses.$200>(
    isAuthorized ? backendRoutes.usersMe : null,
  )
}

export const useUser = (
  userId: Paths.UsersControllerFindOne.Parameters.Id | null,
) => {
  return useSWR<Paths.UsersControllerFindOne.Responses.$200>(
    userId === null ? null : backendRoutes.user(userId),
  )
}

export const useUserId = (
  username: Paths.UsersControllerGetId.Parameters.Username | null,
) => {
  return useSWR<Paths.UsersControllerGetId.Responses.$200>(
    username === null ? null : backendRoutes.userId(username),
  )
}
