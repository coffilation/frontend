import { motion, useAnimation, useMotionValue } from 'framer-motion'
import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import styles from './bottom-sheet.module.scss'

const modeToOffset = {
  small: 0.75,
  medium: 0.5,
  large: 1,
}

interface ScrollableContainerProps {
  children?: ReactNode
}

const IsExpandingPreventedContext = createContext<
  MutableRefObject<boolean> | undefined
>(undefined)

const ScrollableContainer = ({ children }: ScrollableContainerProps) => {
  const isExpandingPreventedRef = useContext(IsExpandingPreventedContext)

  const handleTouchStart = useCallback(() => {
    if (!isExpandingPreventedRef) {
      return
    }

    isExpandingPreventedRef.current = true
  }, [isExpandingPreventedRef])

  const handleTouchEnd = useCallback(() => {
    if (!isExpandingPreventedRef) {
      return
    }

    isExpandingPreventedRef.current = false
  }, [isExpandingPreventedRef])

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {children}
    </div>
  )
}

interface BottomSheetProps {
  closeable?: boolean
  children?: ReactNode
  mode?: `small` | `medium` | `large`
  open?: boolean
  onClose?: () => void
}

export const BottomSheet = ({
  closeable,
  children,
  open = false,
  mode = `medium`,
  onClose,
}: BottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const y = useMotionValue<number | string>(`100%`)
  const touchActive = useRef(false)
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const touchY = useRef<number>()
  const directionRef = useRef<`up` | `down`>()
  const isExpandingPreventedRef = useRef(false)

  const breakpoints = useMemo(() => {
    const breakpoints = [0, 0.5, 0.75]

    if (closeable) {
      breakpoints.push(1)
    }

    return breakpoints
  }, [closeable])

  const handleAnimate = useCallback(
    async (y: number, duration?: number) => {
      await controls.start(
        {
          y,
        },
        { type: `spring`, bounce: 0, velocity: 2, duration },
      )
    },
    [controls],
  )

  const handleMouseDown = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      touchActive.current = true
      touchY.current = event.touches[0].clientY
      controls.stop()
    },
    [controls],
  )

  const handleMouseMove = useCallback(
    (event: TouchEvent) => {
      if (isExpandingPreventedRef.current) {
        return
      }

      if (!scrollEnabled && event.cancelable) {
        event.preventDefault()
      }

      const touch = event.touches[0]
      const yPrev = y.get()

      if (
        !touch ||
        !touchActive.current ||
        touchY.current === undefined ||
        !sheetRef.current ||
        typeof yPrev === `string`
      ) {
        return
      }

      if (touchY.current === 0) {
        directionRef.current = undefined
      } else {
        directionRef.current =
          touchY.current - touch.clientY > 0 ? `up` : `down`
      }

      const isSheetScrolled = sheetRef.current.scrollTop > 0

      const yNext =
        isSheetScrolled || !event.cancelable
          ? 0
          : Math.max(0, yPrev - (touchY.current - touch.clientY))

      y.set(yNext)

      if (yNext === 0 || isSheetScrolled) {
        setScrollEnabled(true)
      } else {
        setScrollEnabled(false)
      }

      touchY.current = touch.clientY
    },
    [scrollEnabled, y],
  )

  const handleTouchEnd = useCallback(async () => {
    const yValue = y.get()

    if (!sheetRef.current || !touchY.current || typeof yValue === `string`) {
      return
    }

    const maxOffset = sheetRef.current.offsetHeight

    const closest = breakpoints
      .map((breakpoint) => breakpoint * maxOffset)
      .reduce((prev, curr) => {
        if (directionRef.current === `up`) {
          return prev <= yValue ? prev : curr
        }

        if (directionRef.current === `down`) {
          return prev >= yValue ? prev : curr
        }

        return Math.abs(curr - yValue) < Math.abs(prev - yValue) ? curr : prev
      })

    touchActive.current = false
    touchY.current = undefined

    await handleAnimate(closest)

    if (onClose && closest === sheetRef.current.offsetHeight) {
      onClose()
    }
  }, [breakpoints, handleAnimate, onClose, y])

  useEffect(() => {
    const sheet = sheetRef.current

    if (!sheet) {
      return
    }

    sheet.addEventListener(`touchmove`, handleMouseMove, { passive: false })

    return () => sheet.removeEventListener(`touchmove`, handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    if (!sheetRef.current) {
      return
    }

    const offsetValue = open
      ? sheetRef.current.offsetHeight * modeToOffset[mode]
      : sheetRef.current.offsetHeight

    handleAnimate(offsetValue).then(() => {
      if (onClose && offsetValue === sheetRef.current?.offsetHeight) {
        onClose()
      }
    })
  }, [handleAnimate, mode, onClose, open])

  return (
    <motion.div
      ref={sheetRef}
      animate={controls}
      style={{ y }}
      className={styles.sheet}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleTouchEnd}
    >
      <IsExpandingPreventedContext.Provider value={isExpandingPreventedRef}>
        {children}
      </IsExpandingPreventedContext.Provider>
    </motion.div>
  )
}

BottomSheet.ScrollableContainer = ScrollableContainer
