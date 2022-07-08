import { useCallback } from 'react'
import { useAuthContext } from 'processes/auth/lib'

export const useHandleLogout = () => {
  const { setIsAuthorized } = useAuthContext()

  const handleLogout = useCallback(() => {
    localStorage.clear()
    setIsAuthorized(false)
  }, [setIsAuthorized])

  return { handleLogout }
}
