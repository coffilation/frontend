import { createContext, Dispatch, SetStateAction } from 'react'

export interface UserAuthContextValue {
  isAuthorized: boolean
  isLoading: boolean
  setIsAuthorized?: Dispatch<SetStateAction<boolean>>
  setIsLoading?: Dispatch<SetStateAction<boolean>>
}

export const UserAuthContext = createContext<UserAuthContextValue>({
  isAuthorized: false,
  isLoading: true,
})
