import { ReactNode, useMemo } from 'react'

import { useIsAuthorized, AuthContext, AuthContextValue } from '../../lib'

interface Props {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const { isAuthorized, isLoading, setIsAuthorized } = useIsAuthorized()

  const authContextValue = useMemo<AuthContextValue>(
    () => ({
      isLoading,
      setIsAuthorized,
      isAuthorized,
    }),
    [isAuthorized, isLoading, setIsAuthorized]
  )

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
