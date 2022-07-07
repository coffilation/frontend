import { useContext } from 'react'

import { AuthContext } from '.'

export const useAuthContext = () => {
  return useContext(AuthContext)
}
