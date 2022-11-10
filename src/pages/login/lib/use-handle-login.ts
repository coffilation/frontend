import { useCallback } from 'react'
import { postAuthLogin } from 'entities/auth/lib'
import { useUserAuthContext } from 'features/user-auth-context/lib'

export const useHandleLogin = () => {
  const setIsAuthorized = useUserAuthContext(
    (contextValue) => contextValue.setIsAuthorized,
  )

  const handleLogin = useCallback(
    async (values: Paths.AuthControllerLogin.RequestBody) => {
      if (!setIsAuthorized) {
        return
      }

      await postAuthLogin(values)
      setIsAuthorized(true)
    },
    [setIsAuthorized],
  )

  return { handleLogin }
}
