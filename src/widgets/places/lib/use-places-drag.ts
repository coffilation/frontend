import { useDrag } from '@use-gesture/react'
import { useEffect, useState } from 'react'

const PLACE_TILE_HEIGHT = 238

interface UsePlacesDragParams {
  onClose: () => void
}

export const usePlacesDrag = ({ onClose }: UsePlacesDragParams) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (offset === PLACE_TILE_HEIGHT) {
      onClose()
    }
  }, [offset, onClose])

  const bind = useDrag(({ delta: [, deltaY], down }) => {
    setOffset((offsetPrevious) => {
      const expectedStickingOut = offsetPrevious + deltaY

      if (down) {
        return Math.max(0, Math.min(PLACE_TILE_HEIGHT, expectedStickingOut))
      } else {
        const stickingOutBreakpoints = [0, PLACE_TILE_HEIGHT]

        return stickingOutBreakpoints.reduce((prev, curr) =>
          Math.abs(curr - expectedStickingOut) <
          Math.abs(prev - expectedStickingOut)
            ? curr
            : prev,
        )
      }
    })
  })

  return { bind, offset }
}
