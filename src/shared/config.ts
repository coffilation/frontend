export enum Path {
  Collections = `/collections`,
  Collection = `/collections/:collectionId`,
  User = `/user/:username`,
  Profile = `/profile`,
  Map = `/map`,
  MapPlaces = `/map/places`,
  MapPlace = `/map/place/:osmType/:osmId`,
}
