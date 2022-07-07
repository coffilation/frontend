import { useEffect, useState } from 'react'
import { postAuthRefresh } from 'entities/auth/lib'

export const useIsAuthorized = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const refresh = localStorage.getItem(`refresh`)
    if (!refresh) {
      setIsLoading(false)
      return
    }

    postAuthRefresh({ refresh })
      .then(({ access, refresh }) => {
        localStorage.setItem(`refresh`, refresh)
        localStorage.setItem(`access`, access)
        setIsAuthorized(true)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  return { isLoading, isAuthorized, setIsAuthorized }
}
