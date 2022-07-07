import { api, routes } from 'shared/api'

export const postAuthLogin = async (
  data: Paths.AuthControllerLogin.RequestBody
) => {
  const response = (
    await api.post<Paths.AuthControllerLogin.Responses.$200>(
      routes.authLogin,
      data
    )
  ).data

  localStorage.setItem(`refresh`, response.refresh)
  api.defaults.headers.common.Authorization = `Bearer ${response.access}`

  return response
}

export const postAuthRefresh = async (
  data: Paths.AuthControllerRefresh.RequestBody
) => {
  const response = (
    await api.post<Paths.AuthControllerRefresh.Responses.$200>(
      routes.authRefresh,
      data
    )
  ).data

  localStorage.setItem(`refresh`, response.refresh)
  api.defaults.headers.common.Authorization = `Bearer ${response.access}`

  return response
}
