import { useAuthContext } from 'processes/auth/lib'
import { useCallback } from 'react'
import { postAuthLogin } from 'entities/auth/lib'

export const useHandleLogin = () => {
  const { setIsAuthorized } = useAuthContext()

  const handleLogin = useCallback(
    async (values: Paths.AuthControllerLogin.RequestBody) => {
      await postAuthLogin(values)
      setIsAuthorized(true)
    },
    [setIsAuthorized]
  )

  return { handleLogin }
}
