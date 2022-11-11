export enum Path {
  Collection = `/collections/:collectionId`,
  // User = `/user/:username`,
  ProfileLogin = `/profile/login`,
  ProfileOwn = `/profile`,
  Profile = `/profile/:username`,
  Map = `/map`,
  MapPlaces = `/map/places`,
  MapPlace = `/map/:osmType/:osmId`,
}
