declare namespace Components {
  namespace Schemas {
    export interface Collection {
      id: number
      name: string
      places: Place[]
      author: User
    }
    export interface CollectionPlacesDto {
      placeIds: number[]
    }
    export interface CreateCollectionDto {
      name: string
      places: number[]
    }
    export interface CreatePlaceDto {
      name: string
      latitude: number
      longitude: number
      osmId: number
    }
    export interface CreateReviewDto {}
    export interface CreateUserDto {
      username: string
      password: string
      rePassword: string
    }
    export interface ObtainTokenPairDto {
      username: string
      password: string
    }
    export interface Place {
      id: number
      name: string
      latitude: number
      longitude: number
      osmId: number
    }
    export interface RefreshTokenPairDto {
      refresh: string
    }
    export interface TokenPair {
      access: string
      refresh: string
    }
    export interface UpdateCollectionDto {
      name?: string
    }
    export interface UpdatePlaceCollectionsDto {
      collectionIds: number[]
    }
    export interface UpdatePlaceDto {
      name?: string
      latitude?: number
      longitude?: number
      osmId?: number
    }
    export interface UpdateReviewDto {}
    export interface UpdateUserDto {
      username?: string
      password?: string
      rePassword?: string
    }
    export interface User {
      id: number
      username: string
    }
  }
}
declare namespace Paths {
  namespace AuthControllerLogin {
    export type RequestBody = Components.Schemas.ObtainTokenPairDto
    namespace Responses {
      export type $200 = Components.Schemas.TokenPair
    }
  }
  namespace AuthControllerRefresh {
    export type RequestBody = Components.Schemas.RefreshTokenPairDto
    namespace Responses {
      export type $200 = Components.Schemas.TokenPair
    }
  }
  namespace CollectionsControllerAddPlaces {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody = Components.Schemas.CollectionPlacesDto
    namespace Responses {
      export type $201 = Components.Schemas.Collection
    }
  }
  namespace CollectionsControllerCreate {
    export type RequestBody = Components.Schemas.CreateCollectionDto
    namespace Responses {
      export type $201 = Components.Schemas.Collection
    }
  }
  namespace CollectionsControllerFindAll {
    namespace Parameters {
      export type AuthorId = number
    }
    export interface QueryParameters {
      authorId?: Parameters.AuthorId
    }
    namespace Responses {
      export type $200 = Components.Schemas.Collection[]
    }
  }
  namespace CollectionsControllerFindOne {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      export type $200 = Components.Schemas.Collection
    }
  }
  namespace CollectionsControllerRemove {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace CollectionsControllerRemovePlaces {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody = Components.Schemas.CollectionPlacesDto
    namespace Responses {
      export type $201 = Components.Schemas.Collection
    }
  }
  namespace CollectionsControllerUpdate {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody = Components.Schemas.UpdateCollectionDto
    namespace Responses {
      export type $200 = Components.Schemas.Collection
    }
  }
  namespace PlacesControllerCreate {
    export type RequestBody = Components.Schemas.CreatePlaceDto
    namespace Responses {
      export type $201 = Components.Schemas.Place
    }
  }
  namespace PlacesControllerFindAll {
    namespace Responses {
      export type $200 = Components.Schemas.Place[]
    }
  }
  namespace PlacesControllerFindOne {
    namespace Parameters {
      export type OsmId = string
    }
    export interface PathParameters {
      osmId: Parameters.OsmId
    }
    namespace Responses {
      export type $200 = Components.Schemas.Place
    }
  }
  namespace PlacesControllerFindPlaceCollections {
    namespace Parameters {
      export type OsmId = string
    }
    export interface PathParameters {
      osmId: Parameters.OsmId
    }
    namespace Responses {
      export type $200 = Components.Schemas.Collection[]
    }
  }
  namespace PlacesControllerRemove {
    namespace Parameters {
      export type OsmId = string
    }
    export interface PathParameters {
      osmId: Parameters.OsmId
    }
    namespace Responses {
      export interface $204 {}
    }
  }
  namespace PlacesControllerUpdate {
    namespace Parameters {
      export type OsmId = string
    }
    export interface PathParameters {
      osmId: Parameters.OsmId
    }
    export type RequestBody = Components.Schemas.UpdatePlaceDto
    namespace Responses {
      export type $200 = Components.Schemas.Place
    }
  }
  namespace PlacesControllerUpdatePlaceCollections {
    namespace Parameters {
      export type OsmId = string
    }
    export interface PathParameters {
      osmId: Parameters.OsmId
    }
    export type RequestBody = Components.Schemas.UpdatePlaceCollectionsDto
    namespace Responses {
      export type $200 = Components.Schemas.Collection[]
    }
  }
  namespace ReviewsControllerCreate {
    export type RequestBody = Components.Schemas.CreateReviewDto
    namespace Responses {
      export type $201 = string
    }
  }
  namespace ReviewsControllerFindAll {
    namespace Responses {
      export type $200 = string
    }
  }
  namespace ReviewsControllerFindOne {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      export type $200 = string
    }
  }
  namespace ReviewsControllerRemove {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      export type $200 = string
    }
  }
  namespace ReviewsControllerUpdate {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody = Components.Schemas.UpdateReviewDto
    namespace Responses {
      export type $200 = string
    }
  }
  namespace UsersControllerCreate {
    export type RequestBody = Components.Schemas.CreateUserDto
    namespace Responses {
      export type $201 = Components.Schemas.User
    }
  }
  namespace UsersControllerFindMe {
    namespace Responses {
      export type $200 = Components.Schemas.User
    }
  }
  namespace UsersControllerFindOne {
    namespace Parameters {
      export type Username = string
    }
    export interface PathParameters {
      username: Parameters.Username
    }
    namespace Responses {
      export type $200 = Components.Schemas.User
    }
  }
  namespace UsersControllerRemove {
    namespace Parameters {
      export type Username = string
    }
    export interface PathParameters {
      username: Parameters.Username
    }
    namespace Responses {
      export interface $204 {}
    }
  }
  namespace UsersControllerUpdate {
    namespace Parameters {
      export type Username = string
    }
    export interface PathParameters {
      username: Parameters.Username
    }
    export type RequestBody = Components.Schemas.UpdateUserDto
    namespace Responses {
      export type $200 = Components.Schemas.User
    }
  }
}
