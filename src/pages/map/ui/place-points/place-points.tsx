import { Marker } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { ReactComponent as LocationIcon } from '../../assets/icnLocation.svg'
import styles from './place-points.module.scss'
import { Dispatch, SetStateAction } from 'react'

interface PlacePointsProps {
  places?: Components.Schemas.Place[]
  activePlaceIndex?: number
  setActivePlaceIndex: Dispatch<SetStateAction<number | undefined>>
}

const icon = divIcon({
  iconSize: [48, 48],
  iconAnchor: [24, 43],
  html: renderToStaticMarkup(<LocationIcon />),
  className: styles.icon,
})

const iconActive = divIcon({
  iconSize: [48, 48],
  iconAnchor: [24, 43],
  html: renderToStaticMarkup(<LocationIcon />),
  className: styles.iconActive,
})

export const PlacePoints = ({
  places,
  activePlaceIndex,
  setActivePlaceIndex,
}: PlacePointsProps) => {
  return (
    <>
      {places?.map((place, index) => (
        <Marker
          key={place.osmId}
          position={[place.latitude, place.longitude]}
          icon={activePlaceIndex === index ? iconActive : icon}
          eventHandlers={{
            click: () => setActivePlaceIndex(index),
          }}
        />
      ))}
    </>
  )
}
