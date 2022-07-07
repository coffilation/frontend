declare namespace Components {
  namespace Schemas {
    export interface Collection {
      id: number
      name: string
      points: Point[]
    }
    export interface CreateCollectionDto {
      name: string
      points: number[]
    }
    export interface CreatePointDto {
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
    export interface Point {
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
      points?: number[]
    }
    export interface UpdatePointDto {
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
  namespace CollectionsControllerCreate {
    export type RequestBody = Components.Schemas.CreateCollectionDto
    namespace Responses {
      export type $201 = Components.Schemas.Collection
    }
  }
  namespace CollectionsControllerFindAll {
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
  namespace PointsControllerCreate {
    export type RequestBody = Components.Schemas.CreatePointDto
    namespace Responses {
      export type $201 = Components.Schemas.Point
    }
  }
  namespace PointsControllerFindAll {
    namespace Responses {
      export type $200 = Components.Schemas.Point[]
    }
  }
  namespace PointsControllerFindOne {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      export type $200 = Components.Schemas.Point
    }
  }
  namespace PointsControllerRemove {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      export interface $204 {}
    }
  }
  namespace PointsControllerUpdate {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody = Components.Schemas.UpdatePointDto
    namespace Responses {
      export type $200 = Components.Schemas.Point
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
