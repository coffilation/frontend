import { Marker } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { ReactComponent as LocationIcon } from '../../assets/icnLocation.svg'
import styles from './place-points.module.scss'
import { Dispatch, SetStateAction } from 'react'
import {useMapContext} from "features/map-context/lib";

interface PlacePointsProps {
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
  activePlaceIndex,
  setActivePlaceIndex,
}: PlacePointsProps) => {
  const [places] = useMapContext((contextValue) => [contextValue.places])

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
