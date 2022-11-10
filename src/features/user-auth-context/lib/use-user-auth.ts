import { useUserAuthContext } from './use-user-auth-context'

export const useUserAuth = () => {
  return useUserAuthContext(({ isAuthorized, isLoading }) => ({
    isAuthorized,
    isLoading,
  }))
}
