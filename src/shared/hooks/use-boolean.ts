import { useCallback, useState } from 'react'

export const useBoolean = (initialValue?: boolean) => {
  const [value, setValue] = useState(initialValue)

  const setIsTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setIsFalse = useCallback(() => {
    setValue(false)
  }, [])

  const toggleValue = useCallback(() => {
    setValue((value) => !value)
  }, [])

  return { value, setValue, setIsTrue, setIsFalse, toggleValue }
}
