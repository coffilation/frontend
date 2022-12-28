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
  user: (userId: Paths.UsersControllerFindOne.Parameters.Id) =>
    `/users/${userId}`,
  userId: (username: Paths.UsersControllerGetId.Parameters.Username) =>
    `/users/${username}/id`,

  places: `/places`,
  place: (osmId: number) => `${backendRoutes.places}/${osmId}`,
  placeByOsmData: (osmId: number, osmType: string, category: string) =>
    `${backendRoutes.places}/${osmId}/${osmType}/${category}`,
  placeCollections: (osmId: number) =>
    `${backendRoutes.place(osmId)}/collections`,
}
