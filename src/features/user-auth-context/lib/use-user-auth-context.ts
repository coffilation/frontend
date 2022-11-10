import { useContext, useMemo } from 'react'

import { UserAuthContext, UserAuthContextValue } from './user-auth-context'

export const useUserAuthContext = <T>(
  getValueCallback: (contextValue: UserAuthContextValue) => T,
) => {
  const context = useContext(UserAuthContext)

  return useMemo(() => getValueCallback(context), [context, getValueCallback])
}
