import { useCallback } from 'react'
import {useUserAuthContext} from "features/user-auth-context/lib";

export const useHandleLogout = () => {
  const setIsAuthorized = useUserAuthContext((contextValue) => contextValue.setIsAuthorized)

  const handleLogout = useCallback(() => {
    if (!setIsAuthorized) {
      return
    }

    localStorage.clear()
    setIsAuthorized(false)
  }, [setIsAuthorized])

  return { handleLogout }
}
