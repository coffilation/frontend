import {
  generatePath,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
} from 'react-router-dom'
import { useEffect } from 'react'
import { useUserAuth } from 'features/user-auth-context/lib'
import { Path } from 'shared/config'
import { useUsersMe } from 'entities/users/lib'

export const ProfileRedirect = () => {
  const navigate = useNavigate()
  const match = useMatch({ path: Path.ProfileOwn, end: true })
  const { isLoading, isAuthorized } = useUserAuth()
  const { data: usersMe, error: usersMeError } = useUsersMe()
  const location = useLocation()

  useEffect(() => {
    if (isLoading || !match) {
      return
    }

    if (!isAuthorized || usersMeError) {
      navigate(Path.ProfileLogin, { replace: true })
    }

    if (isAuthorized && usersMe) {
      navigate(generatePath(Path.Profile, { username: usersMe.username }), {
        replace: true,
      })
    }
  }, [isAuthorized, isLoading, match, navigate, usersMe, usersMeError])

  useEffect(() => {
    if (
      location.pathname.includes(Path.ProfileLogin) &&
      isAuthorized &&
      usersMe
    ) {
      navigate(generatePath(Path.Profile, { username: usersMe.username }), {
        replace: true,
      })
    }
  }, [isAuthorized, location.pathname, navigate, usersMe])

  return isLoading ? null : <Outlet />
}
