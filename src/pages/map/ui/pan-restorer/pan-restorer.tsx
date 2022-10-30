import { useMap } from 'react-leaflet'
import { useEffect, useRef } from 'react'

interface PanRestorerProps {
  hasActiveGeoPoint: boolean
}

export const PanRestorer = ({ hasActiveGeoPoint }: PanRestorerProps) => {
  const map = useMap()
  const hasActiveGeoPointRef = useRef(hasActiveGeoPoint)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (hasActiveGeoPoint) {
      hasActiveGeoPointRef.current = hasActiveGeoPoint
    } else {
      if (hasActiveGeoPointRef.current) {
        timer = setTimeout(() => {
          map.invalidateSize({ animate: true, duration: 0.3 })

          hasActiveGeoPointRef.current = false
        }, 300)
      }
    }

    return () => clearTimeout(timer)
  }, [hasActiveGeoPoint, map])

  return null
}
