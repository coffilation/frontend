import { backendApi, backendRoutes } from 'shared/api'

export const postAuthLogin = async (
  data: Paths.AuthControllerLogin.RequestBody
) => {
  const response = (
    await backendApi.post<Paths.AuthControllerLogin.Responses.$200>(
      backendRoutes.authLogin,
      data
    )
  ).data

  localStorage.setItem(`refresh`, response.refresh)
  backendApi.defaults.headers.common.Authorization = `Bearer ${response.access}`

  return response
}

export const postAuthRefresh = async (
  data: Paths.AuthControllerRefresh.RequestBody
) => {
  const response = (
    await backendApi.post<Paths.AuthControllerRefresh.Responses.$200>(
      backendRoutes.authRefresh,
      data
    )
  ).data

  localStorage.setItem(`refresh`, response.refresh)
  backendApi.defaults.headers.common.Authorization = `Bearer ${response.access}`

  return response
}
