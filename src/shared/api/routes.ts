export const routes = {
  collections: `/collections`,
  collection: (collectionId: number) => `${routes.collections}/${collectionId}`,
  collectionAddPlaces: (collectionId: number) =>
    `${routes.collection(collectionId)}/add-places`,
  collectionRemovePlaces: (collectionId: number) =>
    `${routes.collection(collectionId)}/remove-places`,

  authLogin: `/auth/login`,
  authRefresh: `/auth/refresh`,

  usersMe: `/users/me`,

  places: `/places`,
  place: (osmId: number) => `${routes.places}/${osmId}`,
  placeCollections: (osmId: number) => `${routes.place(osmId)}/collections`,

  search: `https://nominatim.openstreetmap.org/search`,
}
