import { ReactNode, useEffect, useMemo, useState } from 'react'
import { UserAuthContext, UserAuthContextValue } from '../lib/user-auth-context'
import { postAuthRefresh } from 'entities/auth/lib'

interface MapProviderProps {
  children: ReactNode
}

export const UserAuthProvider = ({ children }: MapProviderProps) => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const refresh = localStorage.getItem(`refresh`)

    if (!refresh) {
      setIsLoading(false)
      return
    }

    postAuthRefresh({ refresh })
      .then(() => setIsAuthorized(true))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  const value = useMemo<UserAuthContextValue>(
    () => ({ isAuthorized, setIsAuthorized, isLoading, setIsLoading }),
    [isAuthorized, isLoading],
  )

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  )
}
