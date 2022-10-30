declare namespace Components {
  namespace Schemas {
    export interface Address {
      isolatedDwelling?: string
      cityBlock?: string
      houseNumber?: string
      houseName?: string
      manMade?: string
      mountainPass?: string
      stateDistrict?: string
      countryCode?: string
      cityDistrict?: string
      amenity?: string
      road?: string
      district?: string
      borough?: string
      suburb?: string
      subdivision?: string
      hamlet?: string
      croft?: string
      neighbourhood?: string
      allotments?: string
      quarter?: string
      residential?: string
      farm?: string
      farmyard?: string
      industrial?: string
      commercial?: string
      retail?: string
      emergency?: string
      historic?: string
      military?: string
      natural?: string
      landuse?: string
      place?: string
      railway?: string
      aerialway?: string
      boundary?: string
      aeroway?: string
      club?: string
      craft?: string
      leisure?: string
      office?: string
      shop?: string
      tourism?: string
      bridge?: string
      tunnel?: string
      waterway?: string
      city?: string
      town?: string
      state?: string
      village?: string
      region?: string
      postcode?: string
      country?: string
      municipality?: string
    }
    export interface Collection {
      id: number
      name: string
      description?: string
      author?: User
      type: 'PUBLIC' | 'PRIVATE'
    }
    export interface CreateCollectionDto {
      name: string
      type: 'PUBLIC' | 'PRIVATE'
      description?: string
    }
    export interface CreateInviteDto {
      role: 'OWNER' | 'ADMIN' | 'EDITOR' | 'MEMBER'
    }
    export interface CreatePlaceDto {
      name: string
      latitude: number
      longitude: number
      osmId: number
      osmType: string
      displayName: string
      category: string
      type: string
      address: Address
    }
    export interface CreateReviewDto {
      rating: number
      description?: string
    }
    export interface CreateUserDto {
      username: string // /^[^0-9]\w+$/
      password: string
      rePassword: string
    }
    export interface GetUserIdDto {
      id: number
    }
    export interface Invite {
      uuid: string
      collectionId: number
      role: 'OWNER' | 'ADMIN' | 'EDITOR' | 'MEMBER'
      collection: Collection
    }
    export interface ObtainTokenPairDto {
      username: string
      password: string
    }
    export interface Place {
      name: string
      latitude: number
      longitude: number
      osmId: number
      osmType: string
      displayName: string
      category: string
      type: string
      address: Address
    }
    export interface RefreshTokenPairDto {
      refresh: string
    }
    export interface Review {
      id: number
      author: User
      rating: number
      description?: string
    }
    export interface TokenPair {
      access: string
      refresh: string
    }
    export interface UpdateCollectionDto {
      name?: string
      type?: 'PUBLIC' | 'PRIVATE'
      description?: string
    }
    export interface UpdateCollectionPlacesDto {
      placeOsmIds: number[]
    }
    export interface UpdatePlaceCollectionsDto {
      collectionIds: number[]
    }
    export interface UpdateReviewDto {
      rating?: number
      description?: string
    }
    export interface UpdateUserDto {
      username?: string // /^[^0-9]\w+$/
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
  namespace CollectionsControllerCreate {
    export type RequestBody = Components.Schemas.CreateCollectionDto
    namespace Responses {
      export type $201 = Components.Schemas.Collection
    }
  }
  namespace CollectionsControllerFindAll {
    namespace Parameters {
      export type PlaceOsmId = number
      export type UserId = number
    }
    export interface QueryParameters {
      placeOsmId?: Parameters.PlaceOsmId
      userId?: Parameters.UserId
    }
    namespace Responses {
      export type $200 = Components.Schemas.Collection[]
    }
  }
  namespace CollectionsControllerFindOne {
    namespace Parameters {
      export type Id = number
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
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      export interface $204 {}
    }
  }
  namespace CollectionsControllerUpdate {
    namespace Parameters {
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody = Components.Schemas.UpdateCollectionDto
    namespace Responses {
      export type $200 = Components.Schemas.Collection
    }
  }
  namespace CollectionsControllerUpdatePlaces {
    namespace Parameters {
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody = Components.Schemas.UpdateCollectionPlacesDto
    namespace Responses {
      export type $200 = Components.Schemas.Place[]
    }
  }
  namespace InvitesControllerAccept {
    namespace Parameters {
      export type Uuid = string
    }
    export interface PathParameters {
      uuid: Parameters.Uuid
    }
    namespace Responses {
      export interface $201 {}
    }
  }
  namespace InvitesControllerCreate {
    namespace Parameters {
      export type CollectionId = number
    }
    export interface QueryParameters {
      collectionId: Parameters.CollectionId
    }
    export type RequestBody = Components.Schemas.CreateInviteDto
    namespace Responses {
      export interface $201 {}
    }
  }
  namespace InvitesControllerFindOne {
    namespace Parameters {
      export type Uuid = string
    }
    export interface PathParameters {
      uuid: Parameters.Uuid
    }
    namespace Responses {
      export type $200 = Components.Schemas.Invite
    }
  }
  namespace PlacesControllerCreate {
    export type RequestBody = Components.Schemas.CreatePlaceDto
    namespace Responses {
      export interface $201 {}
    }
  }
  namespace PlacesControllerFindAll {
    namespace Parameters {
      export type CollectionId = number
      export type UserId = number
    }
    export interface QueryParameters {
      collectionId?: Parameters.CollectionId
      userId?: Parameters.UserId
    }
    namespace Responses {
      export type $200 = Components.Schemas.Place[]
    }
  }
  namespace PlacesControllerFindOne {
    namespace Parameters {
      export type OsmId = number
    }
    export interface PathParameters {
      osmId: Parameters.OsmId
    }
    namespace Responses {
      export type $200 = Components.Schemas.Place
    }
  }
  namespace PlacesControllerUpdatePlaceCollections {
    namespace Parameters {
      export type OsmId = number
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
    namespace Parameters {
      export type PlaceOsmId = number
    }
    export interface QueryParameters {
      placeOsmId: Parameters.PlaceOsmId
    }
    export type RequestBody = Components.Schemas.CreateReviewDto
    namespace Responses {
      export type $201 = Components.Schemas.Review
    }
  }
  namespace ReviewsControllerFindAll {
    namespace Parameters {
      export type PlaceOsmId = number
    }
    export interface QueryParameters {
      placeOsmId: Parameters.PlaceOsmId
    }
    namespace Responses {
      export type $200 = Components.Schemas.Review[]
    }
  }
  namespace ReviewsControllerFindOne {
    namespace Parameters {
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      export type $200 = Components.Schemas.Review
    }
  }
  namespace ReviewsControllerRemove {
    namespace Parameters {
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace ReviewsControllerUpdate {
    namespace Parameters {
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody = Components.Schemas.UpdateReviewDto
    namespace Responses {
      export type $200 = Components.Schemas.Review
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
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      export type $200 = Components.Schemas.User
    }
  }
  namespace UsersControllerGetId {
    namespace Parameters {
      export type Username = string
    }
    export interface PathParameters {
      username: Parameters.Username
    }
    namespace Responses {
      export type $200 = Components.Schemas.GetUserIdDto
    }
  }
  namespace UsersControllerRemove {
    namespace Parameters {
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      export interface $204 {}
    }
  }
  namespace UsersControllerUpdate {
    namespace Parameters {
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody = Components.Schemas.UpdateUserDto
    namespace Responses {
      export type $200 = Components.Schemas.User
    }
  }
}
