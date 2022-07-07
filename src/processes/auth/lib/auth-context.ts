import { createContext, Dispatch, SetStateAction } from 'react'

export interface AuthContextValue {
  isAuthorized: boolean
  isLoading: boolean
  setIsAuthorized: Dispatch<SetStateAction<boolean>>
}

export const authContextDefaultValue: AuthContextValue = {
  isAuthorized: false,
  isLoading: true,
  setIsAuthorized: () => null,
}

export const AuthContext = createContext<AuthContextValue>(
  authContextDefaultValue
)
