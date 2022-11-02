import styles from './bottom-sheet.module.scss'
import { ComponentProps, ReactNode, useEffect, useState } from 'react'
import { BottomSheet as SpringBottomSheet } from 'react-spring-bottom-sheet'

interface BottomSheetProps {
  open: boolean
  children: ReactNode
  onDismiss?: () => void
  onClose?: ComponentProps<typeof SpringBottomSheet>[`onSpringEnd`]
}

export const BottomSheet = ({
  children,
  open,
  onDismiss,
  onClose,
}: BottomSheetProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  return (
    <SpringBottomSheet
      open={isOpen}
      header={false}
      scrollLocking={false}
      skipInitialTransition
      className={styles.wrapper}
      expandOnContentDrag
      // @ts-ignore
      style={{ '--rsbs-overlay-rounded': `2px` }}
      blocking={false}
      onDismiss={onDismiss}
      defaultSnap={({ maxHeight }) => maxHeight / 2}
      snapPoints={({ maxHeight }) => [
        maxHeight,
        maxHeight * 0.6,
        maxHeight / 4,
      ]}
      onSpringEnd={onClose}
    >
      <div className={styles.content}>{children}</div>
    </SpringBottomSheet>
  )

  // const map = useMap()
  //
  // const [stickingOut, setStickingOut] = useState<number>(StickingOut.Default)
  // const [isDragging, setIsDragging] = useState(false)
  // const [isScrolling, setIsScrolling] = useState(false)
  // const draggableRef = useRef<HTMLDivElement>(null)
  //
  // const bind = useDrag(
  //   ({ delta: [, deltaY], direction: [, directionY], down, ...state }) => {
  //     console.log(state)
  //     setStickingOut((stickingOutPrevious) => {
  //       if (!draggableRef.current?.parentElement) {
  //         return stickingOutPrevious
  //       }
  //
  //       setIsDragging(down)
  //
  //       const expectedStickingOut = stickingOutPrevious - deltaY
  //       const parentHeight = draggableRef.current.parentElement.offsetHeight + 1
  //
  //       if (
  //         (directionY === -1 && stickingOut === parentHeight) ||
  //         draggableRef.current.scrollTop > 0
  //       ) {
  //         setIsScrolling(true)
  //       } else {
  //         setIsScrolling(false)
  //       }
  //
  //       if (down) {
  //         return Math.max(
  //           StickingOut.Minimal,
  //           Math.min(parentHeight, expectedStickingOut),
  //         )
  //       } else {
  //         const stickingOutBreakpoints = [
  //           StickingOut.Minimal,
  //           StickingOut.Default,
  //           parentHeight,
  //         ]
  //
  //         return stickingOutBreakpoints.reduce((prev, curr) =>
  //           Math.abs(curr - expectedStickingOut) <
  //           Math.abs(prev - expectedStickingOut)
  //             ? curr
  //             : prev,
  //         )
  //       }
  //     })
  //   },
  // )
  //
  // return (
  //   <div
  //     ref={draggableRef}
  //     className={classNames(
  //       styles.wrapper,
  //       isDragging && styles.wrapperDragging,
  //       isScrolling && styles.wrapperScrolling,
  //     )}
  //     style={{ transform: `translateY(calc(100% - ${stickingOut}px))` }}
  //   >
  //     <div {...(isScrolling ? {} : bind())}>drag there</div>
  //     {children}
  //   </div>
  // )
}
