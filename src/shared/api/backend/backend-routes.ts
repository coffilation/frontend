export const backendRoutes = {
  collections: `/collections`,
  collection: (collectionId: number) =>
    `${backendRoutes.collections}/${collectionId}`,
  collectionAddPlaces: (collectionId: number) =>
    `${backendRoutes.collection(collectionId)}/add-places`,
  collectionRemovePlaces: (collectionId: number) =>
    `${backendRoutes.collection(collectionId)}/remove-places`,

  authLogin: `/auth/login`,
  authRefresh: `/auth/refresh`,

  usersMe: `/users/me`,

  places: `/places`,
  place: (osmId: number) => `${backendRoutes.places}/${osmId}`,
  placeCollections: (osmId: number) =>
    `${backendRoutes.place(osmId)}/collections`,
}
